const express = require('express');
const crypto = require('crypto');
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const verifyRazorpaySignature = ({ orderId, paymentId, signature }) => {
    if (!process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay secret is not configured");
    }

    if (!orderId || !paymentId || !signature) {
        return false;
    }

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature);
    const signatureBuffer = Buffer.from(signature);

    return (
        expectedBuffer.length === signatureBuffer.length &&
        crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
    );
};

// route POST /api/checkout
// desc: Create a new checkout
// access: Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ msg: "Checkout items are required" });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({ msg: "Server error" });
    }
});

// route POST /api/checkout/:id/razorpay-order
// desc: Create a Razorpay order for an existing checkout
// access: Private
router.post("/:id/razorpay-order", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!checkout) {
            return res.status(404).json({ msg: "Checkout not found" });
        }

        if (checkout.isPaid || checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout is already paid or finalized" });
        }

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ message: "Razorpay is not configured" });
        }

        const auth = Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
        ).toString("base64");

        const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: Math.round(checkout.totalPrice * 100),
                currency: "INR",
                receipt: checkout._id.toString(),
            }),
        });

        const razorpayOrder = await razorpayResponse.json();

        if (!razorpayResponse.ok) {
            return res.status(502).json({
                message: "Unable to create Razorpay order",
                error: razorpayOrder,
            });
        }

        checkout.paymentDetails = {
            ...(checkout.paymentDetails || {}),
            razorpayOrderId: razorpayOrder.id,
        };
        await checkout.save();

        res.status(201).json({
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// route PUT /api/checkout/:id/pay
// desc: Update checkout to mark as paid after successful payment
// access: Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!checkout) {
            return res.status(404).json({ msg: "Checkout not found" });
        }

        const isValidPayment = verifyRazorpaySignature({
            orderId: paymentDetails?.razorpay_order_id,
            paymentId: paymentDetails?.razorpay_payment_id,
            signature: paymentDetails?.razorpay_signature,
        });

        const expectedOrderId = checkout.paymentDetails?.razorpayOrderId;

        if (
            paymentStatus === "paid" &&
            isValidPayment &&
            expectedOrderId === paymentDetails?.razorpay_order_id
        ) {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid payment confirmation" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// route POST /api/checkout/:id/finalize
// desc: Finalize checkout and convert to an order after payment confirmation
// access: Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!checkout) {
            return res.status(404).json({ msg: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // Clear the user's cart
            await Cart.findOneAndDelete({ userId: checkout.user });

            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

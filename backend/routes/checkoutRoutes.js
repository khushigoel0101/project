const express = require('express');
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Products");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

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

// route PUT /api/checkout/:id/pay
// desc: Update checkout to mark as paid after successful payment
// access: Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ msg: "Checkout not found" });
        }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid payment status" });
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
        const checkout = await Checkout.findById(req.params.id);

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
            await Cart.findOneAndDelete({ user: checkout.user });

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

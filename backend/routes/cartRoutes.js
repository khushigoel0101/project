const express = require('express');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const Product = require('../models/Products');
const User = require('../models/Users');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper function to get existing cart
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

const getCartOwner = async (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id).select('_id');
        if (!user) {
            throw new Error('User not found');
        }
        return { userId: user._id };
    }

    const guestId = req.body.guestId || req.query.guestId;
    if (!guestId) {
        return {};
    }
    return { guestId };
};

// @route   POST /api/cart
// @desc    Add a product to the cart (guest or logged-in user)
// @access  Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color } = req.body;

    try {
        const { userId, guestId } = await getCartOwner(req);
        if (!userId && !guestId) {
            return res.status(400).json({ message: "Cart owner is required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        let cart = await getCart(userId, guestId);

        if (cart) {
            const productIndex = cart.product.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                cart.product[productIndex].quantity += quantity;
            } else {
                cart.product.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
            }

            cart.totalPrice = cart.product.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                userId: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                product: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   PUT /api/cart
// @desc    Update product quantity in cart for a guest or logged in user
// @access  Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color } = req.body;

    try {
        const { userId, guestId } = await getCartOwner(req);
        if (!userId && !guestId) {
            return res.status(400).json({ message: "Cart owner is required" });
        }

        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.product.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                cart.product[productIndex].quantity = quantity;
            } else {
                cart.product.splice(productIndex, 1);
            }

            cart.totalPrice = cart.product.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   DELETE /api/cart
// @desc    Remove a product from the cart
// @access  Public
router.delete("/", async (req, res) => {
    const { productId, size, color } = req.body;

    try {
        const { userId, guestId } = await getCartOwner(req);
        if (!userId && !guestId) {
            return res.status(400).json({ message: "Cart owner is required" });
        }

        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.product.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1) {
            cart.product.splice(productIndex, 1);

            cart.totalPrice = cart.product.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   GET /api/cart
// @desc    Get logged-in user's or guest user's cart
// @access  Public
router.get("/", async (req, res) => {
    try {
        const { userId, guestId } = await getCartOwner(req);
        if (!userId && !guestId) {
            return res.status(400).json({ message: "Cart owner is required" });
        }

        let cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// @route   POST /api/cart/merge
// @desc    Merge guest cart into user cart on login
// @access  Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;

    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ userId: req.user._id });

        if (guestCart) {
            if (guestCart.product.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty" });
            }

            if (userCart) {
                guestCart.product.forEach((guestItem) => {
                    const productIndex = userCart.product.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        userCart.product[productIndex].quantity += guestItem.quantity;
                    } else {
                        userCart.product.push(guestItem);
                    }
                });

                userCart.totalPrice = userCart.product.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
                await userCart.save();

                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.error("Error deleting guest cart:", error);
                }
                res.status(200).json(userCart);
            } else {
                guestCart.userId = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart);
            }
        } else {
            if (userCart) {
                return res.status(200).json(userCart);
            }
            return res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const Cart = require("../models/Cart");
const Item = require("../models/Item");

// Get current user's cart
router.get("/", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate("items.itemId");
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (err) {
        console.error("GET /api/cart error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Add item to cart
router.post("/add", verifyToken, async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        // Validate item exists
        const item = await Item.findById(itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // Find or create cart
        let cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) cart = new Cart({ userId: req.user.userId, items: [] });

        // Check if item already in cart
        const existingItemIndex = cart.items.findIndex(i => i.itemId.toString() === itemId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ itemId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error("POST /api/cart/add error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Remove item from cart
router.post("/remove", verifyToken, async (req, res) => {
    try {
        const { itemId } = req.body;

        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
        await cart.save();

        res.json(cart);
    } catch (err) {
        console.error("POST /api/cart/remove error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

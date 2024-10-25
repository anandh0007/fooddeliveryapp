// routes/cart.js
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// POST /api/carts - Add item to cart
router.post("/", async (req, res) => {
    const { userId, productname, price, image } = req.body;
    try {
        const newCartItem = new Cart({ userId, productname, price, image });
        await newCartItem.save();
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});

// GET /api/carts/:userId - Get items in cart for a user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const cartItems = await Cart.find({ userId });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
});

module.exports = router;

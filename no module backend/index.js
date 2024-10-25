// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Cart = require("./models/Cart");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/Food'; // Replace with your actual MongoDB URI
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Add a simple root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.post('/api/carts', async (req, res) => {
    try {
        const { userId, productname, price, image } = req.body;

        // Check if item already exists in the user's cart
        let cartItem = await Cart.findOne({ userId, productname });

        if (cartItem) {
            cartItem.quantity += 1; // If item exists, increment the quantity
        } else {
            // Create a new cart item if it doesn't exist
            cartItem = new Cart({ userId, productname, price, image });
        }

        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Error adding item to cart' });
    }
});

// Get all cart items for a user
app.get('/api/carts/:userId', async (req, res) => {
    try {
        const cartItems = await Cart.find({ userId: req.params.userId });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart items' });
    }
});

// Update cart item quantity (increase or decrease)
app.put('/api/carts/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);
        if (cartItem) {
            const { action } = req.body; // "increase" or "decrease"
            if (action === 'increase') {
                cartItem.quantity += 1;
            } else if (action === 'decrease' && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            }
            await cartItem.save();
            res.json(cartItem);
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating cart item' });
    }
});

// Delete item from cart
app.delete('/api/carts/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);
        if (cartItem) {
            await Cart.findByIdAndDelete(req.params.id);
            res.json({ message: 'Cart item deleted' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting cart item' });
    }
});

// Import routes
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts');

// Use routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', cartRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

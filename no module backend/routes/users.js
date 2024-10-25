const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    console.log("Request body:", req.body); // Log the request body
    const { fullname, email, password } = req.body;

    // Check for missing fields
    if (!fullname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ fullname, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error); // Log detailed error
        res.status(500).json({ message: "Error registering user" });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Log the login attempt
    // console.log("Login attempt:", { email, password });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({ user: { id: user._id, fullname: user.fullname, email: user.email } });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
});
router.put("/api/users/:userId", async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { fullname, email, password }, // You may want to hash the password before saving
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.send(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Server error");
    }
});
router.put('/update-profile', async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        // Find the user by their email (you can also use user ID or other identifier)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.fullname = fullname;
        user.email = email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            user.password = hashedPassword;
        }

        await user.save(); // Save updated user info to the database

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

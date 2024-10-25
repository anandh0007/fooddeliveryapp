const express = require('express');
const Recipe = require('../models/Recipe');

const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes" });
    }
});

// Add a new recipe
router.post('/', async (req, res) => {
    const { productname, price, image } = req.body;
    
    const recipe = new Recipe({ productname, price, image });

    try {
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ message: "Error adding recipe" });
    }
});

// Additional routes for updating and deleting recipes can be added here...

module.exports = router;

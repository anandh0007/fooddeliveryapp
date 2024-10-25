const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Store URL or file path
});

module.exports = mongoose.model('Recipe', recipeSchema);

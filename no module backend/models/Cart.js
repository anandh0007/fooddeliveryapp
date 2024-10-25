const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    productname: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model('Cart', cartSchema);

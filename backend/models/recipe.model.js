const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    ingredients: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    steps: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);
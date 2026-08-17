const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2
    },

    category: {
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
                required: true,
                min: 1
            }
        }
    ],

    steps: {
        type: String,
        required: true
    }
});

const recipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = recipeModel;
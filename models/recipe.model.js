const mongoose = require('mongoose')

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
    ingredients: {
        type: [String],
        required: true
    },
    steps: {
        type: String,
        required: true
    }
})

const recipeModel = mongoose.model('Recipe', recipeSchema)

module.exports = recipeModel
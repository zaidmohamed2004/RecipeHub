const connection = require('./connection.js')
const Recipe = require('../models/recipe.model.js')

connection()

const sample = [
    { name: "Pancakes", category: "Desserts", ingredients: ["flour","egg","milk"], steps: "Mix and cook on a griddle." },
    { name: "Mojito", category: "Drinks", ingredients: ["mint","lime","soda"], steps: "Muddle mint and lime, top with soda." }
]

Recipe.insertMany(sample).then(() => {
    console.log('Seeded')
    process.exit()
})
const express = require('express')
const app = express()
const connection = require('./db/connection.js')
const userRoutes = require('./Routs/userRouts.js')
const recipeRoutes = require('./Routs/recipeRouts.js')
const port = 7777

app.use(express.json())

app.use('/users', userRoutes)
app.use('/recipes', recipeRoutes)

connection()

app.listen(port, () => {
    console.log(`RecipeHub app listening on port ${port}!`)
})
const express = require('express')
const app = express()
const connection = require('./db/connection.js')
const port = 7777

app.use(express.json())
connection()

app.listen(port, () => {
    console.log(`RecipeHub app listening on port ${port}!`)
})
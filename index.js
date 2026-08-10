const express = require('express');
const app = express();

const connection = require('./db/connection.js');
require('dotenv').config();

const userRoutes = require('./Routs/userRouts.js');
const recipeRoutes = require('./Routs/recipeRouts.js');

const port = process.env.PORT || 7777;

app.use(express.json());

connection();

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);

app.listen(port, () => {
    console.log(`RecipeHub app listening on port ${port}!`);
});
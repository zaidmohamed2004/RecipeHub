const express = require('express');
const app = express();

const connection = require('./db/connection.js');
require('dotenv').config();

const userRoutes = require('./Routs/userRouts.js');
const recipeRoutes = require('./Routs/recipeRouts.js');
const productRoutes = require('./Routs/productRoutes.js');
const cartRoutes = require("./Routs/cartRoutes.js"); // 👈 اتصلحت هنا (Routs من غير e)
const orderRoutes = require("./Routs/orderRoutes");
const port = process.env.PORT || 7777;

app.use(express.json());

connection();

app.use("/products", productRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => {
    console.log(`RecipeHub app listening on port ${port}`);
});
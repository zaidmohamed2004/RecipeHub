require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const connection = require('./config/db.js');

const userRoutes = require('./Routs/userRouts.js');
const recipeRoutes = require('./Routs/recipeRouts.js');
const productRoutes = require('./Routs/productRoutes.js');
const cartRoutes = require("./Routs/cartRoutes.js");
const orderRoutes = require("./Routs/orderRoutes");

const port = process.env.PORT || 7777;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use(express.json());

// =========================
// DATABASE
// =========================

connection();

// =========================
// ROUTES
// =========================

app.use("/products", productRoutes);

app.use("/users", userRoutes);

app.use("/recipes", recipeRoutes);

app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);

// =========================
// SERVER
// =========================

app.listen(port, () => {
    console.log(`RecipeHub app listening on port ${port}`);
});
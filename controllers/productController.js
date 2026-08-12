const Product = require("../models/product.model");

// Add Product
const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      msg: "Product added successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message
    });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      products
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message
    });
  }
};

module.exports = {
  addProduct,
  getProducts
};
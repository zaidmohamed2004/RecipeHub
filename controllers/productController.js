const Product = require("../models/product.model");

const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      msg: "Product added successfully",
      product
    });
    } 
  catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message
    });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      products
    });
  } 
  catch (error) {
    res.status(500).json({
      msg: "Error",
      error: error.message
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // عشان يرجع المنتج بعد التعديل
    );

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
};
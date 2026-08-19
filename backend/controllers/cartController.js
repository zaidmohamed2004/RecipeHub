const Cart = require("../models/cart.model");
const Recipe = require("../models/recipe.model");

const addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const user = req.userId;
        let cart = await Cart.findOne({ user });

        if (!cart) {
            cart = await Cart.create({
                user,
                items: [
                    {
                        product,
                        quantity
                    }
                ]
            });
        } 
        else {
            const existingItem = cart.items.find(
                item => item.product.toString() === product
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } 
            else {
                cart.items.push({
                    product,
                    quantity
                });
            }

            await cart.save();
        }

        res.status(201).json({
            msg: "Product added to cart",
            cart
        });

    } 
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error: error.message
        });
    }
};

const addRecipeToCart = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const user = req.userId;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({
                user,
                items: []
            });
        }

        recipe.ingredients.forEach(ingredient => {
            const existingItem = cart.items.find(
                item => item.product.toString() === ingredient.product.toString()
            );

            if (existingItem) {
                existingItem.quantity += ingredient.quantity;
            } 
            else {
                cart.items.push({
                    product: ingredient.product,
                    quantity: ingredient.quantity
                });
            }
        });

        await cart.save();

        res.status(200).json({
            msg: "All recipe ingredients added to cart successfully",
            cart
        });

    } 
    catch (error) {
        res.status(500).json({
            msg: "Error",
            error: error.message
        });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.userId }).populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json({
            cart
        });

    } 
    catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
};

module.exports = {
    addToCart,
    addRecipeToCart,
    getCart
};
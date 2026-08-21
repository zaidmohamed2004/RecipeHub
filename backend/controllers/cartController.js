const Cart = require("../models/cart.model");
const Recipe = require("../models/recipe.model");

// إضافة منتج منفرد للسلة
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

        } else {

            const existingItem = cart.items.find(
                item =>
                    item.product.toString() === product
            );

            if (existingItem) {

                existingItem.quantity += quantity;

            } else {

                cart.items.push({
                    product,
                    quantity
                });

            }

            await cart.save();
        }

        // مهم
        await cart.populate("items.product");

        res.status(201).json({
            msg: "Product added to cart",
            cart
        });

    } catch (error) {

        console.error("ADD TO CART ERROR:", error);

        res.status(500).json({
            msg: "Error",
            error: error.message
        });

    }
};

// تحويل جميع مكونات الوصفة لمنتجات وإضافتها للسلة
const addRecipeToCart = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const user = req.userId;

        // البحث عن الوصفة ومكوناتها
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        // البحث عن سلة المستخدم أو إنشائها
        let cart = await Cart.findOne({ user });

        if (!cart) {
            cart = new Cart({
                user,
                items: []
            });
        }

        // إضافة كل مكونات الوصفة للسلة
        recipe.ingredients.forEach(ingredient => {

            const existingItem = cart.items.find(
                item =>
                    item.product.toString() ===
                    ingredient.product.toString()
            );

            if (existingItem) {

                // المنتج موجود بالفعل
                existingItem.quantity += ingredient.quantity;

            } else {

                // إضافة المنتج لأول مرة
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

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error: error.message
        });
    }
};


// عرض السلة للمستخدم
const getCart = async (req, res) => {
    try {

        let cart = await Cart.findOne({
            user: req.userId
        });

        // لو المستخدم لسه معندوش Cart
        // ننشئ له Cart فاضية بدل 404
        if (!cart) {
            cart = await Cart.create({
                user: req.userId,
                items: []
            });
        }

        // تحميل بيانات المنتجات الموجودة في السلة
        cart = await cart.populate("items.product");

        res.status(200).json({
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: "Error",
            error: error.message
        });

    }
};
// تحديث كمية منتج في السلة
const updateCartItemQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        const user = req.userId;

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json({
            message: "Cart quantity updated",
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating cart",
            error: error.message
        });

    }
};


// حذف منتج من السلة
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const user = req.userId;

        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: "Error removing product",
            error: error.message
        });

    }
};


module.exports = {
    addToCart,
    addRecipeToCart,
    getCart,
    updateCartItemQuantity,
    removeFromCart
};
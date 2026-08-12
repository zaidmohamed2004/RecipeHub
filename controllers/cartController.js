const Cart = require("../models/cart.model");
const Recipe = require("../models/recipe.model"); // 1. استيراد موديل الوصفات

// 🛒 إضافة منتج منفرد للسلة
const addToCart = async (req, res) => {
    try {
        const { user, product, quantity } = req.body;

        let cart = await Cart.findOne({ user });

        // لو المستخدم معندوش Cart
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
        // لو عنده Cart بالفعل
        else {
            const existingItem = cart.items.find(
                item => item.product.toString() === product
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

        res.status(201).json({
            msg: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            msg: "Error",
            error: error.message
        });
    }
};

// 🍳 تحويل جميع مكونات الوصفة لمنتجات وإضافتها للسلة
const addRecipeToCart = async (req, res) => {
    try {
        const { user, recipeId } = req.body;

        // 1. البحث عن الوصفة ومكوناتها
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        // 2. البحث عن سلة المستخدم (أو إنشائها لو مش موجودة)
        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({
                user,
                items: []
            });
        }

        // 3. المرور على كل مكونات الوصفة وإضافتها للسلة
        recipe.ingredients.forEach(ingredient => {
            const existingItem = cart.items.find(
                item => item.product.toString() === ingredient.product.toString()
            );

            if (existingItem) {
                // لو المنتج موجود مسبقاً نزيد الكمية
                existingItem.quantity += ingredient.quantity;
            } else {
                // لو مش موجود نضيفه كمنتج جديد في السلة
                cart.items.push({
                    product: ingredient.product,
                    quantity: ingredient.quantity
                });
            }
        });

        // 4. حفظ التعديلات في قاعدة البيانات
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

// 📥 عرض السلة للمستخدم
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

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

module.exports = {
    addToCart,
    addRecipeToCart,
    getCart
};
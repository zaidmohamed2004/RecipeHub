const Recipe = require("../models/recipe.model.js");

const createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);

        res.status(201).json({
            message: "Recipe created successfully",
            data: newRecipe
        });

    } 
    catch (error) {
        res.status(400).json({
            message: "Error creating recipe",
            error: error.message
        });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        // تحويل القيم لأرقام لتجنب مشاكل الـ Types
        let limit = parseInt(req.query.limit) || 10;
        let page = parseInt(req.query.page) || 1;

        let skip = (page - 1) * limit;

        const recipes = await Recipe
            .find()
            .populate("ingredients.product") // 👈 إضافة الـ Populate هنا
            .limit(limit)
            .skip(skip);

        res.status(200).json({
            message: "Recipes fetched successfully",
            page: page,
            limit: limit,
            data: recipes
        });

    } 
    catch (error) {
        res.status(500).json({
            message: "Error fetching recipes",
            error: error.message
        });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
            .populate("ingredients.product"); // 👈 وإضافة الـ Populate هنا كمان

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe fetched successfully",
            data: recipe
        });

    } 
    catch (error) {
        res.status(500).json({
            message: "Error fetching recipe",
            error: error.message
        });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("ingredients.product");

        if (!updatedRecipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe updated successfully",
            data: updatedRecipe
        });

    } 
    catch (error) {
        res.status(400).json({
            message: "Error updating recipe",
            error: error.message
        });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(
            req.params.id
        );

        if (!deletedRecipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe deleted successfully",
            data: deletedRecipe
        });

    } 
    catch (error) {
        res.status(500).json({
            message: "Error deleting recipe",
            error: error.message
        });
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};
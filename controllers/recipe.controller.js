const Recipe = require('../models/recipe.model');

// 1. Create a new recipe
const createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json({ message: "Recipe created successfully", data: newRecipe });
    } catch (error) {
        res.status(400).json({ message: "Error creating recipe", error: error.message });
    }
};

// 2. Get all recipes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json({ message: "Recipes fetched successfully", data: recipes });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error: error.message });
    }
};

// 3. Get recipe by ID
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipe fetched successfully", data: recipe });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipe", error: error.message });
    }
};

// 4. Update recipe
const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipe updated successfully", data: updatedRecipe });
    } catch (error) {
        res.status(400).json({ message: "Error updating recipe", error: error.message });
    }
};

// 5. Delete recipe
const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipe deleted successfully", data: deletedRecipe });
    } catch (error) {
        res.status(500).json({ message: "Error deleting recipe", error: error.message });
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};
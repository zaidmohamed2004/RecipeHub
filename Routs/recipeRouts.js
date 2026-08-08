const express = require("express");
const recipeController = require("../controllers/recipeController.js");
const validationRecipe= require("../middlewares/recipeValidation.js");

const router = express.Router();

router
    .route("/")
    .get(recipeController.getAllRecipes)
    .post(validationRecipe, recipeController.createRecipe);

router
    .route("/:id")
    .get(recipeController.getRecipeById)
    .put(validationRecipe, recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe);

module.exports = router;
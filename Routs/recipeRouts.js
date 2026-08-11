const express = require("express");
const recipeController = require("../controllers/recipeController.js");
const validationRecipe = require("../validations/recipeValidation.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const resultValidation = require("../middlewares/resultValidation.js");
const allowTo = require('../middlewares/allowTo.js');
const router = express.Router();

router
    .route("/")
    .get(recipeController.getAllRecipes)
    .post(validationRecipe, resultValidation, recipeController.createRecipe);

router
    .route("/:id")
    .get(recipeController.getRecipeById)
    .put(validationRecipe, recipeController.updateRecipe)
    .delete(authMiddleware, allowTo("admin"), recipeController.deleteRecipe);
    

module.exports = router;
const express = require("express");
const recipeController = require("../controllers/recipeController.js");
const validationRecipe = require("../middlewares/recipeValidation.js");
const verifyToken = require('../middlewares/verifyToken.js');
const allowTo = require('../middlewares/allowTo.js');
const router = express.Router();

router
    .route("/")
    .get(recipeController.getAllRecipes)
    .post(validationRecipe, recipeController.createRecipe);

router
    .route("/:id")
    .get(recipeController.getRecipeById)
    .put(validationRecipe, recipeController.updateRecipe)
    .delete(
        verifyToken,
        allowTo("admin"),
        recipeController.deleteRecipe
    );

module.exports = router;
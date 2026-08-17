const { body } = require("express-validator");

const recipeValidation = [

    body("name")
        .notEmpty()
        .withMessage("Recipe name is required")
        .isLength({ min: 2 })
        .withMessage("Recipe name must be at least 2 characters"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("ingredients")
        .notEmpty()
        .withMessage("Ingredients are required")
        .isArray({ min: 1 })
        .withMessage("Ingredients must be a non-empty array"),

    body("ingredients.*.product")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid product ID"),

    body("ingredients.*.quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

    body("steps")
        .notEmpty()
        .withMessage("Steps are required")
        .isLength({ min: 10 })
        .withMessage("Steps must be at least 10 characters")

];

module.exports = recipeValidation;
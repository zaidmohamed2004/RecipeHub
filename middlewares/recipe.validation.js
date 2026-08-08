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
        .isArray()
        .withMessage("Ingredients must be an array"),

    body("steps")
        .notEmpty()
        .withMessage("Steps are required")
        .isLength({ min: 10 })
        .withMessage("Steps must be at least 10 characters")

];

module.exports = recipeValidation;
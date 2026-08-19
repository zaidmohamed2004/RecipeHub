const { body } = require("express-validator");

const productValidation = [

    body("name")
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2 })
        .withMessage("Product name must be at least 2 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number")

];

module.exports = productValidation;
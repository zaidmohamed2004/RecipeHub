const { body } = require("express-validator");

const orderValidation = [

    body("shippingAddress")
        .notEmpty()
        .withMessage("Shipping address is required")
        .isLength({ min: 5 })
        .withMessage("Shipping address must be at least 5 characters"),

    body("phone")
        .notEmpty()
        .withMessage("Phone is required")
        .isMobilePhone("ar-EG")
        .withMessage("Invalid Egyptian phone number"),

    body("paymentMethod")
        .optional()
        .isIn(["Cash on Delivery"])
        .withMessage("Invalid payment method")

];

module.exports = orderValidation;
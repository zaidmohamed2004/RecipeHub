const express = require("express");

const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

const cartValidation = require("../validations/cartValidation");

const resultValidation = require("../middlewares/resultValidation");

const router = express.Router();

router.post(
    "/add",
    authMiddleware,
    cartValidation,
    resultValidation,
    cartController.addToCart
);

router.post(
    "/add-recipe",
    authMiddleware,
    resultValidation,
    cartController.addRecipeToCart
);

router.get(
    "/",
    authMiddleware,
    cartController.getCart
);

module.exports = router;
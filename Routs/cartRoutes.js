const express = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

router.post("/add", authMiddleware, cartController.addToCart);
router.post("/add-recipe", authMiddleware, cartController.addRecipeToCart);
router.get("/", authMiddleware, cartController.getCart);

module.exports = router;


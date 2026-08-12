const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.post("/add", cartController.addToCart);
router.post("/add-recipe", cartController.addRecipeToCart); // 👈 المسار الجديد
router.get("/:userId", cartController.getCart);

module.exports = router;
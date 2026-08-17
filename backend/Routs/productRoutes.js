const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const allowTo = require("../middlewares/allowTo");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

router.patch("/:id", authMiddleware, allowTo("admin"), productController.updateProduct);

router.post("/", authMiddleware, allowTo("admin"), productController.addProduct);

module.exports = router;
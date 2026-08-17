const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// لازم اللي بيعمل Checkout يكون عامل Login وعنده Token صحيحة
router.post("/checkout", authMiddleware, orderController.createOrder);

router.get("/", authMiddleware, orderController.getUserOrders);


module.exports = router;
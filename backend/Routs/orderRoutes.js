const express = require("express");

const router = express.Router();

const orderValidation = require("../validations/orderValidation");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const resultValidation = require("../middlewares/resultValidation");

router.post(
    "/checkout",
    authMiddleware,
    orderValidation,
    resultValidation,
    orderController.createOrder
);

router.get(
    "/",
    authMiddleware,
    orderController.getUserOrders
);

module.exports = router;
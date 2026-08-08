const express = require("express");
const userController = require("../controllers/userController.js")
const loginValidation = require("../middlewares/loginValidation.js");

const registerValidation = require("../middlewares/registerValidation.js")


const router = express.Router();

router.post("/register", registerValidation, userController.register);

router.post("/login", loginValidation, userController.login);

module.exports = router;
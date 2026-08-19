const express = require("express");
const userController = require("../controllers/userController.js")
const userValidation = require("../validations/userValidation.js");
const resultValidation = require("../middlewares/resultValidation.js");

const router = express.Router();


router.post("/register", userValidation.registerValidation, resultValidation, userController.register);

router.post("/login", userValidation.loginValidation, resultValidation,userController.login);


module.exports = router;
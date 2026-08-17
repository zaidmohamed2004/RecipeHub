const express = require("express");
const userController = require("../controllers/userController.js")
const loginValidation = require("../validations/loginValidation.js");
const registerValidation = require("../validations/registerValidation.js")
const resultValidation = require("../middlewares/resultValidation.js");

const router = express.Router();


router.post("/register", registerValidation, resultValidation, userController.register);

router.post("/login", loginValidation, resultValidation,userController.login);


module.exports = router;
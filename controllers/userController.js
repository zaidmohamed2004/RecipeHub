const User = require("../models/user.model.js");

// Register
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "Registered Successfully",
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.status(400).json({
                error: "Invalid Email or Password"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


module.exports = {
    register,
    login
};
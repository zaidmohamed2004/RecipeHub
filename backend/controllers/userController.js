const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwt.js");

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Registered Successfully",
            data: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            }
        });

    } 
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "Invalid Email or Password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid Email or Password"
            });
        }

        const token = generateToken({
            id: user._id,
            role: user.role
        });

        res.status(200).json({
            message: "Login Successful",
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });

    } 
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


module.exports = {
    register,
    login
};


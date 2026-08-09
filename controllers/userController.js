const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

        // Encrypt password
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

        // Find user by email only
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "Invalid Email or Password"
            });
        }

        // Compare normal password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid Email or Password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token: token,
            user: user
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
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.join(__dirname, "../.env")
});

const connection = async () => {
    try {

        console.log("MONGO_URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

    } 
    
    catch (error) {
        console.log(
            "MongoDB connection error:",
            error.message
        );
    }
};

module.exports = connection;
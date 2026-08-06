const mongoose = require('mongoose')

const connection = () => {
    mongoose.connect("mongodb://localhost:27017/recipeHubApp").then(() => {
        console.log('DB connected');
    })
}

module.exports = connection
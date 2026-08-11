const connection = require("./connection.js");

const Recipe = require("../models/recipe.model.js");
const User = require("../models/user.model.js");

connection();

const recipes = [
  {
    name: "Pancakes",
    category: "Desserts",
    ingredients: ["flour", "egg", "milk"],
    steps: "Mix and cook on a griddle."
  },
  {
    name: "Mojito",
    category: "Drinks",
    ingredients: ["mint", "lime", "soda"],
    steps: "Muddle mint and lime, top with soda."
  }
];

const users = [
  {
    firstName: "Zaid",
    lastName: "Mohamed",
    email: "zaid@example.com",
    password: "123456"
  },
  {
    firstName: "Ahmed",
    lastName: "Ali",
    email: "ahmed@example.com",
    password: "password123"
  },
  {
    firstName: "Sara",
    lastName: "Hassan",
    email: "sara@example.com",
    password: "qwerty123"
  }
];

async function seed() {
  try {
    await Recipe.deleteMany({});
    await User.deleteMany({});

    await Recipe.insertMany(recipes);
    await User.insertMany(users);

    console.log("Recipes and Users seeded successfully!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();
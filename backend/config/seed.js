const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const connection = require("./db.js");

const Product = require("../models/product.model.js");
const Recipe = require("../models/recipe.model.js");
const User = require("../models/user.model.js");
const Cart = require("../models/cart.model.js");

// =====================================================
// PRODUCTS
// =====================================================

const products = [

    // =========================
    // MEAT & CHICKEN
    // =========================

    {
        name: "Chicken Breast",
        price: 180
    },
    {
        name: "Chicken Thighs",
        price: 145
    },
    {
        name: "Ground Beef",
        price: 260
    },
    {
        name: "Beef Steak",
        price: 420
    },
    {
        name: "Bacon",
        price: 190
    },

    // =========================
    // VEGETABLES
    // =========================

    {
        name: "Tomato",
        price: 25
    },
    {
        name: "Onion",
        price: 15
    },
    {
        name: "Garlic",
        price: 12
    },
    {
        name: "Bell Pepper",
        price: 35
    },
    {
        name: "Mushrooms",
        price: 65
    },
    {
        name: "Spinach",
        price: 40
    },
    {
        name: "Potato",
        price: 30
    },
    {
        name: "Carrot",
        price: 20
    },
    {
        name: "Cucumber",
        price: 20
    },
    {
        name: "Lettuce",
        price: 25
    },

    // =========================
    // DAIRY
    // =========================

    {
        name: "Milk",
        price: 40
    },
    {
        name: "Butter",
        price: 75
    },
    {
        name: "Cheddar Cheese",
        price: 120
    },
    {
        name: "Mozzarella Cheese",
        price: 135
    },
    {
        name: "Parmesan Cheese",
        price: 160
    },
    {
        name: "Cream",
        price: 90
    },

    // =========================
    // GRAINS & BAKING
    // =========================

    {
        name: "Flour",
        price: 45
    },
    {
        name: "Pasta",
        price: 55
    },
    {
        name: "Rice",
        price: 60
    },
    {
        name: "Bread",
        price: 25
    },
    {
        name: "Tortilla",
        price: 50
    },

    // =========================
    // EGGS & PANTRY
    // =========================

    {
        name: "Egg",
        price: 12
    },
    {
        name: "Olive Oil",
        price: 140
    },
    {
        name: "Salt",
        price: 10
    },
    {
        name: "Black Pepper",
        price: 25
    },
    {
        name: "Tomato Sauce",
        price: 45
    }
];


// =====================================================
// USERS
// =====================================================

const users = [

    {
        firstName: "Zaid",
        lastName: "Mohamed",
        email: "zaid@example.com",
        password: "123456",
        role: "admin"
    },

    {
        firstName: "Ahmed",
        lastName: "Ali",
        email: "ahmed@example.com",
        password: "password123",
        role: "user"
    },

    {
        firstName: "Sara",
        lastName: "Hassan",
        email: "sara@example.com",
        password: "qwerty123",
        role: "user"
    },

    {
        firstName: "Omar",
        lastName: "Khaled",
        email: "omar@example.com",
        password: "omar123456",
        role: "user"
    },

    {
        firstName: "Mariam",
        lastName: "Mostafa",
        email: "mariam@example.com",
        password: "mariam123"
        ,
        role: "user"
    }
];


// =====================================================
// SEED FUNCTION
// =====================================================

async function seed() {

    try {

        console.log("");
        console.log("======================================");
        console.log("       CONNECTING TO DATABASE         ");
        console.log("======================================");

        await connection();

        console.log("MongoDB connected");
        console.log("");


        // =================================================
        // DELETE OLD DATABASE DATA
        // =================================================

        console.log("Deleting old data...");

        await Product.deleteMany({});
        await Recipe.deleteMany({});
        await User.deleteMany({});
        await Cart.deleteMany({});

        console.log("Old products deleted");
        console.log("Old recipes deleted");
        console.log("Old users deleted");
        console.log("");


        // =================================================
        // CREATE PRODUCTS
        // =================================================

        console.log("Creating products...");

        const createdProducts = await Product.insertMany(products);

        console.log(
            `${createdProducts.length} products created`
        );

        console.log("");


        // =================================================
        // PRODUCT HELPER
        // =================================================

        const product = (name) => {

            const found = createdProducts.find(
                item => item.name === name
            );

            if (!found) {

                throw new Error(
                    `Product "${name}" was not found`
                );

            }

            return found._id;
        };


        // =================================================
        // RECIPES
        // =================================================

        const recipes = [

            // =================================================
            // 1. CREAMY GARLIC CHICKEN PASTA
            // =================================================

            {
                name: "Creamy Garlic Chicken Pasta",

                category: "Pasta",

                image:
                    "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Breast"),
                        quantity: 2
                    },

                    {
                        product: product("Pasta"),
                        quantity: 2
                    },

                    {
                        product: product("Garlic"),
                        quantity: 3
                    },

                    {
                        product: product("Cream"),
                        quantity: 1
                    },

                    {
                        product: product("Parmesan Cheese"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Boil the pasta in salted water until al dente.\n" +
                    "Cut the chicken breast into small pieces and season with salt and black pepper.\n" +
                    "Heat a pan with olive oil and cook the chicken until golden brown.\n" +
                    "Add minced garlic and cook for one minute.\n" +
                    "Pour in the cream and let the sauce simmer gently.\n" +
                    "Add the cooked pasta and mix everything together.\n" +
                    "Add parmesan cheese and stir until the sauce becomes creamy.\n" +
                    "Cook for another two minutes and serve hot."
            },


            // =================================================
            // 2. MARGHERITA PIZZA
            // =================================================

            {
                name: "Classic Margherita Pizza",

                category: "Pizza",

                image:
                    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Flour"),
                        quantity: 3
                    },

                    {
                        product: product("Tomato Sauce"),
                        quantity: 1
                    },

                    {
                        product: product("Mozzarella Cheese"),
                        quantity: 2
                    },

                    {
                        product: product("Tomato"),
                        quantity: 2
                    },

                    {
                        product: product("Olive Oil"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Prepare the pizza dough using flour, water and salt.\n" +
                    "Knead the dough until smooth and elastic.\n" +
                    "Allow the dough to rest until it doubles in size.\n" +
                    "Roll the dough into a round pizza base.\n" +
                    "Spread tomato sauce evenly over the dough.\n" +
                    "Add mozzarella cheese and sliced tomatoes.\n" +
                    "Drizzle with olive oil.\n" +
                    "Bake in a very hot oven until the crust becomes golden and the cheese melts."
            },


            // =================================================
            // 3. BEEF BURGER
            // =================================================

            {
                name: "Classic Beef Burger",

                category: "Burgers",

                image:
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Ground Beef"),
                        quantity: 2
                    },

                    {
                        product: product("Bread"),
                        quantity: 2
                    },

                    {
                        product: product("Cheddar Cheese"),
                        quantity: 2
                    },

                    {
                        product: product("Tomato"),
                        quantity: 1
                    },

                    {
                        product: product("Lettuce"),
                        quantity: 1
                    },

                    {
                        product: product("Onion"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Season the ground beef with salt and black pepper.\n" +
                    "Shape the beef into thick burger patties.\n" +
                    "Heat a grill or frying pan over medium-high heat.\n" +
                    "Cook the patties for several minutes on each side.\n" +
                    "Place cheddar cheese on top during the final minute.\n" +
                    "Toast the burger buns until lightly golden.\n" +
                    "Add lettuce, tomato and onion to the bun.\n" +
                    "Place the burger patty inside and serve immediately."
            },


            // =================================================
            // 4. CHICKEN CAESAR SALAD
            // =================================================

            {
                name: "Chicken Caesar Salad",

                category: "Salads",

                image:
                    "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Breast"),
                        quantity: 1
                    },

                    {
                        product: product("Lettuce"),
                        quantity: 2
                    },

                    {
                        product: product("Bread"),
                        quantity: 1
                    },

                    {
                        product: product("Parmesan Cheese"),
                        quantity: 1
                    },

                    {
                        product: product("Olive Oil"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    }
                ],

                steps:
                    "Season the chicken breast with salt and black pepper.\n" +
                    "Grill the chicken until fully cooked and golden.\n" +
                    "Wash and chop the lettuce.\n" +
                    "Cut bread into small cubes and toast until crispy.\n" +
                    "Slice the cooked chicken into strips.\n" +
                    "Combine lettuce, chicken and croutons.\n" +
                    "Add parmesan cheese and Caesar dressing.\n" +
                    "Toss well and serve chilled."
            },


            // =================================================
            // 5. PANCAKES
            // =================================================

            {
                name: "Fluffy Breakfast Pancakes",

                category: "Breakfast",

                image:
                    "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Flour"),
                        quantity: 2
                    },

                    {
                        product: product("Egg"),
                        quantity: 2
                    },

                    {
                        product: product("Milk"),
                        quantity: 2
                    },

                    {
                        product: product("Butter"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Mix flour and salt in a large bowl.\n" +
                    "Whisk the eggs and milk together in another bowl.\n" +
                    "Combine the wet and dry ingredients until just mixed.\n" +
                    "Heat a pan and add a small amount of butter.\n" +
                    "Pour a small amount of batter into the pan.\n" +
                    "Cook until bubbles appear on the surface.\n" +
                    "Flip and cook the other side until golden.\n" +
                    "Repeat with the remaining batter and serve warm."
            },


            // =================================================
            // 6. CHICKEN FRIED RICE
            // =================================================

            {
                name: "Chicken Fried Rice",

                category: "Rice",

                image:
                    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Breast"),
                        quantity: 1
                    },

                    {
                        product: product("Rice"),
                        quantity: 2
                    },

                    {
                        product: product("Egg"),
                        quantity: 2
                    },

                    {
                        product: product("Carrot"),
                        quantity: 1
                    },

                    {
                        product: product("Bell Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Onion"),
                        quantity: 1
                    },

                    {
                        product: product("Olive Oil"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    }
                ],

                steps:
                    "Cook the rice and allow it to cool completely.\n" +
                    "Dice the chicken into small pieces.\n" +
                    "Heat oil in a large pan.\n" +
                    "Cook the chicken until golden and fully cooked.\n" +
                    "Add onion, carrot and bell pepper.\n" +
                    "Push the vegetables to one side and scramble the eggs.\n" +
                    "Add the cooked rice and mix everything together.\n" +
                    "Season with black pepper and stir-fry for several minutes."
            },


            // =================================================
            // 7. MUSHROOM PASTA
            // =================================================

            {
                name: "Creamy Mushroom Pasta",

                category: "Pasta",

                image:
                    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Pasta"),
                        quantity: 2
                    },

                    {
                        product: product("Mushrooms"),
                        quantity: 2
                    },

                    {
                        product: product("Cream"),
                        quantity: 1
                    },

                    {
                        product: product("Butter"),
                        quantity: 1
                    },

                    {
                        product: product("Garlic"),
                        quantity: 2
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Boil the pasta until al dente.\n" +
                    "Slice the mushrooms into thin pieces.\n" +
                    "Melt butter in a large pan.\n" +
                    "Add garlic and mushrooms and cook until golden.\n" +
                    "Add cream and simmer gently.\n" +
                    "Season with salt and black pepper.\n" +
                    "Add the pasta and toss until completely coated.\n" +
                    "Serve immediately while hot."
            },


            // =================================================
            // 8. CHICKEN WRAP
            // =================================================

            {
                name: "Loaded Chicken Wrap",

                category: "Lunch",

                image:
                    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Breast"),
                        quantity: 2
                    },

                    {
                        product: product("Tortilla"),
                        quantity: 2
                    },

                    {
                        product: product("Lettuce"),
                        quantity: 1
                    },

                    {
                        product: product("Tomato"),
                        quantity: 1
                    },

                    {
                        product: product("Cheddar Cheese"),
                        quantity: 1
                    },

                    {
                        product: product("Bell Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Olive Oil"),
                        quantity: 1
                    }
                ],

                steps:
                    "Slice the chicken into thin strips.\n" +
                    "Season the chicken and cook it in olive oil.\n" +
                    "Add sliced bell pepper and cook until tender.\n" +
                    "Warm the tortillas in a dry pan.\n" +
                    "Add lettuce, tomato and cheddar cheese.\n" +
                    "Add the cooked chicken mixture.\n" +
                    "Fold the tortilla tightly into a wrap.\n" +
                    "Toast the wrap lightly before serving."
            },


            // =================================================
            // 9. CREAMY GARLIC CHICKEN
            // =================================================

            {
                name: "Creamy Garlic Chicken",

                category: "Dinner",

                image:
                    "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Breast"),
                        quantity: 2
                    },

                    {
                        product: product("Cream"),
                        quantity: 1
                    },

                    {
                        product: product("Garlic"),
                        quantity: 4
                    },

                    {
                        product: product("Butter"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Season the chicken breasts with salt and black pepper.\n" +
                    "Heat butter in a large skillet.\n" +
                    "Sear the chicken on both sides until golden.\n" +
                    "Add minced garlic and cook until fragrant.\n" +
                    "Pour in the cream and reduce the heat.\n" +
                    "Cover and simmer until the chicken is fully cooked.\n" +
                    "Taste and adjust the seasoning.\n" +
                    "Serve the chicken with the creamy garlic sauce."
            },


            // =================================================
            // 10. STEAK
            // =================================================

            {
                name: "Beef Steak with Potatoes",

                category: "Dinner",

                image:
                    "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Beef Steak"),
                        quantity: 2
                    },

                    {
                        product: product("Potato"),
                        quantity: 3
                    },

                    {
                        product: product("Butter"),
                        quantity: 1
                    },

                    {
                        product: product("Garlic"),
                        quantity: 3
                    },

                    {
                        product: product("Olive Oil"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Season the steaks generously with salt and black pepper.\n" +
                    "Cut potatoes into wedges.\n" +
                    "Toss the potatoes with olive oil and roast until crispy.\n" +
                    "Heat a heavy pan until very hot.\n" +
                    "Sear the steaks on both sides until they reach your preferred doneness.\n" +
                    "Add butter and garlic to the pan.\n" +
                    "Baste the steaks with the garlic butter.\n" +
                    "Rest the steaks for several minutes before serving with potatoes."
            },


            // =================================================
            // 11. TOMATO PASTA
            // =================================================

            {
                name: "Classic Tomato Pasta",

                category: "Pasta",

                image:
                    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Pasta"),
                        quantity: 2
                    },

                    {
                        product: product("Tomato Sauce"),
                        quantity: 2
                    },

                    {
                        product: product("Tomato"),
                        quantity: 2
                    },

                    {
                        product: product("Garlic"),
                        quantity: 2
                    },

                    {
                        product: product("Olive Oil"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    }
                ],

                steps:
                    "Boil pasta in salted water until al dente.\n" +
                    "Heat olive oil in a pan.\n" +
                    "Add minced garlic and cook briefly.\n" +
                    "Add tomato sauce and chopped tomatoes.\n" +
                    "Simmer the sauce for several minutes.\n" +
                    "Season with salt and black pepper.\n" +
                    "Add the pasta and toss until coated.\n" +
                    "Serve hot."
            },


            // =================================================
            // 12. QUESADILLA
            // =================================================

            {
                name: "Cheesy Chicken Quesadilla",

                category: "Mexican",

                image:
                    "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Breast"),
                        quantity: 1
                    },

                    {
                        product: product("Tortilla"),
                        quantity: 2
                    },

                    {
                        product: product("Cheddar Cheese"),
                        quantity: 2
                    },

                    {
                        product: product("Bell Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Onion"),
                        quantity: 1
                    },

                    {
                        product: product("Tomato"),
                        quantity: 1
                    }
                ],

                steps:
                    "Cook the chicken and cut it into small pieces.\n" +
                    "Saute onion and bell pepper until tender.\n" +
                    "Place one tortilla in a hot pan.\n" +
                    "Add cheese, chicken, vegetables and tomato.\n" +
                    "Cover with another tortilla.\n" +
                    "Cook until the bottom becomes golden.\n" +
                    "Flip carefully and cook the other side.\n" +
                    "Cut into triangles and serve warm."
            },


            // =================================================
            // 13. GARDEN SALAD
            // =================================================

            {
                name: "Fresh Garden Salad",

                category: "Salads",

                image:
                    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Lettuce"),
                        quantity: 2
                    },

                    {
                        product: product("Tomato"),
                        quantity: 2
                    },

                    {
                        product: product("Cucumber"),
                        quantity: 2
                    },

                    {
                        product: product("Bell Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Onion"),
                        quantity: 1
                    },

                    {
                        product: product("Olive Oil"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Wash all vegetables thoroughly.\n" +
                    "Chop the lettuce into bite-sized pieces.\n" +
                    "Slice tomatoes, cucumber and bell pepper.\n" +
                    "Thinly slice the onion.\n" +
                    "Combine all vegetables in a large bowl.\n" +
                    "Drizzle with olive oil.\n" +
                    "Season with salt and toss gently.\n" +
                    "Serve immediately."
            },


            // =================================================
            // 14. SPINACH CHICKEN
            // =================================================

            {
                name: "Creamy Spinach Chicken",

                category: "Healthy",

                image:
                    "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Breast"),
                        quantity: 2
                    },

                    {
                        product: product("Spinach"),
                        quantity: 2
                    },

                    {
                        product: product("Cream"),
                        quantity: 1
                    },

                    {
                        product: product("Garlic"),
                        quantity: 3
                    },

                    {
                        product: product("Butter"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    }
                ],

                steps:
                    "Season the chicken breasts with salt and pepper.\n" +
                    "Sear the chicken in butter until golden brown.\n" +
                    "Remove the chicken and saute garlic in the same pan.\n" +
                    "Add spinach and cook until wilted.\n" +
                    "Pour in the cream and stir well.\n" +
                    "Return the chicken to the pan.\n" +
                    "Cover and cook until the chicken is completely done.\n" +
                    "Serve with the creamy spinach sauce."
            },


            // =================================================
            // 15. BACON AND EGGS
            // =================================================

            {
                name: "Bacon and Egg Breakfast",

                category: "Breakfast",

                image:
                    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Bacon"),
                        quantity: 3
                    },

                    {
                        product: product("Egg"),
                        quantity: 3
                    },

                    {
                        product: product("Bread"),
                        quantity: 2
                    },

                    {
                        product: product("Cheddar Cheese"),
                        quantity: 1
                    },

                    {
                        product: product("Butter"),
                        quantity: 1
                    }
                ],

                steps:
                    "Cook the bacon in a skillet until crispy.\n" +
                    "Remove the bacon and leave a small amount of fat in the pan.\n" +
                    "Crack the eggs into the pan.\n" +
                    "Cook until the whites are set.\n" +
                    "Toast the bread with butter.\n" +
                    "Add cheddar cheese to the toast.\n" +
                    "Top with eggs and crispy bacon.\n" +
                    "Serve immediately."
            },


            // =================================================
            // 16. CHICKEN SOUP
            // =================================================

            {
                name: "Homestyle Chicken Soup",

                category: "Soups",

                image:
                    "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Chicken Thighs"),
                        quantity: 2
                    },

                    {
                        product: product("Carrot"),
                        quantity: 2
                    },

                    {
                        product: product("Potato"),
                        quantity: 2
                    },

                    {
                        product: product("Onion"),
                        quantity: 1
                    },

                    {
                        product: product("Garlic"),
                        quantity: 2
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Place the chicken in a large pot with water.\n" +
                    "Add onion and garlic.\n" +
                    "Bring the mixture to a gentle boil.\n" +
                    "Add chopped carrots and potatoes.\n" +
                    "Season with salt and black pepper.\n" +
                    "Simmer until the chicken and vegetables are tender.\n" +
                    "Remove the chicken, shred it and return it to the soup.\n" +
                    "Serve hot."
            },


            // =================================================
            // 17. BEEF NACHOS
            // =================================================

            {
                name: "Cheesy Beef Nachos",

                category: "Mexican",

                image:
                    "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Ground Beef"),
                        quantity: 1
                    },

                    {
                        product: product("Cheddar Cheese"),
                        quantity: 2
                    },

                    {
                        product: product("Tomato"),
                        quantity: 1
                    },

                    {
                        product: product("Onion"),
                        quantity: 1
                    },

                    {
                        product: product("Bell Pepper"),
                        quantity: 1
                    }
                ],

                steps:
                    "Brown the ground beef in a hot pan.\n" +
                    "Add diced onion and bell pepper.\n" +
                    "Cook until the vegetables are tender.\n" +
                    "Arrange tortilla chips on a baking tray.\n" +
                    "Spread the beef mixture over the chips.\n" +
                    "Cover generously with cheddar cheese.\n" +
                    "Bake until the cheese is melted and bubbling.\n" +
                    "Top with fresh tomatoes and serve."
            },


            // =================================================
            // 18. GARLIC BUTTER MUSHROOMS
            // =================================================

            {
                name: "Garlic Butter Mushrooms",

                category: "Side Dishes",

                image:
                    "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Mushrooms"),
                        quantity: 3
                    },

                    {
                        product: product("Butter"),
                        quantity: 2
                    },

                    {
                        product: product("Garlic"),
                        quantity: 4
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Salt"),
                        quantity: 1
                    }
                ],

                steps:
                    "Clean and slice the mushrooms.\n" +
                    "Melt butter in a large skillet.\n" +
                    "Add minced garlic and cook until fragrant.\n" +
                    "Add mushrooms and cook over high heat.\n" +
                    "Stir occasionally until the mushrooms become golden.\n" +
                    "Season with salt and black pepper.\n" +
                    "Cook for another minute.\n" +
                    "Serve as a side dish."
            },


            // =================================================
            // 19. BEEF TACOS
            // =================================================

            {
                name: "Classic Beef Tacos",

                category: "Mexican",

                image:
                    "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Ground Beef"),
                        quantity: 2
                    },

                    {
                        product: product("Tortilla"),
                        quantity: 3
                    },

                    {
                        product: product("Tomato"),
                        quantity: 2
                    },

                    {
                        product: product("Lettuce"),
                        quantity: 1
                    },

                    {
                        product: product("Cheddar Cheese"),
                        quantity: 1
                    },

                    {
                        product: product("Onion"),
                        quantity: 1
                    }
                ],

                steps:
                    "Cook the ground beef in a hot skillet.\n" +
                    "Add chopped onion and cook until soft.\n" +
                    "Season the beef with salt and black pepper.\n" +
                    "Warm the tortillas in a pan.\n" +
                    "Fill each tortilla with the beef mixture.\n" +
                    "Add shredded lettuce and chopped tomatoes.\n" +
                    "Top with cheddar cheese.\n" +
                    "Fold and serve immediately."
            },


            // =================================================
            // 20. OMELETTE
            // =================================================

            {
                name: "Loaded Breakfast Omelette",

                category: "Breakfast",

                image:
                    "https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=1200&q=85",

                ingredients: [

                    {
                        product: product("Egg"),
                        quantity: 4
                    },

                    {
                        product: product("Cheddar Cheese"),
                        quantity: 1
                    },

                    {
                        product: product("Mushrooms"),
                        quantity: 1
                    },

                    {
                        product: product("Bell Pepper"),
                        quantity: 1
                    },

                    {
                        product: product("Tomato"),
                        quantity: 1
                    },

                    {
                        product: product("Butter"),
                        quantity: 1
                    },

                    {
                        product: product("Black Pepper"),
                        quantity: 1
                    }
                ],

                steps:
                    "Crack the eggs into a bowl and whisk thoroughly.\n" +
                    "Slice the mushrooms, bell pepper and tomato.\n" +
                    "Melt butter in a non-stick pan.\n" +
                    "Saute the vegetables until slightly tender.\n" +
                    "Pour the eggs over the vegetables.\n" +
                    "Cook gently until the eggs begin to set.\n" +
                    "Add cheddar cheese to one half.\n" +
                    "Fold the omelette and cook for another minute."
            }
        ];


        // =================================================
        // INSERT RECIPES
        // =================================================

        console.log("Creating recipes...");

        const createdRecipes =
            await Recipe.insertMany(recipes);

        console.log(
            `${createdRecipes.length} recipes created`
        );

        console.log("");


        // =================================================
        // INSERT USERS
        // =================================================

        console.log("Creating users...");

        const createdUsers =
            await User.insertMany(users);

        console.log(
            `${createdUsers.length} users created`
        );

        console.log("");


        // =================================================
        // SUCCESS
        // =================================================

        console.log("======================================");
        console.log("       RecipeHub Database Seeded      ");
        console.log("======================================");
        console.log("");
        console.log(
            `Products: ${createdProducts.length}`
        );
        console.log(
            `Recipes:  ${createdRecipes.length}`
        );
        console.log(
            `Users:    ${createdUsers.length}`
        );
        console.log("");
        console.log("Images:   20");
        console.log("");
        console.log("Database is ready!");
        console.log("======================================");


        process.exit(0);

    } catch (error) {

        console.error("");
        console.error("======================================");
        console.error("          SEEDING FAILED               ");
        console.error("======================================");
        console.error(error);
        console.error("======================================");

        process.exit(1);
    }
}


// =====================================================
// RUN SEED
// =====================================================

seed();
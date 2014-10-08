'use strict';

var mongoose = require('mongoose'),
    ProductRecipeSchema = mongoose.model('ProductRecipe').schema,
    ProductRecipe = mongoose.model('ProductRecipe'),
    RecipeCategory = mongoose.model('RecipeCategory');

var recipeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    categoryName: { type: String },
    minutes: { type: Number },
    image: { type: String },
    products: [ProductRecipeSchema]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.seedInitialRecipes = function () {
    Recipe.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            Recipe.create({
                name: 'Blue cheese and broccoli pasta',
                description: 'Cook the pasta according to packet instructions. Place the broccoli in a steamer or in a saucepan of boiling water and cook until just tender, for approximately 5 minutes. Drain well then transfer to a food processor and blend to a bright green purée. Place the crème fraîche and cheese in a medium saucepan over a low heat and stir until the cheese has melted to form a smooth sauce. Stir in the lemon zest and juice, plenty of pepper and the nutmeg. Scrape the broccoli purée into the pan and stir well. Pour the sauce over the cooked pasta and sprinkle with the walnuts to serve. ',
                category: 'Main dishes',
                products: [
                    new ProductRecipe({
                        name: 'Pasta',
                        quantity: 400
                    }),
                    new ProductRecipe({
                        name: 'Broccoli',
                        quantity: 250
                    }),
                    new ProductRecipe({
                        name: 'Cooking cream',
                        quantity: 200
                    }),
                    new ProductRecipe({
                        name: 'Blue cheese',
                        quantity: 200
                    }),
                    new ProductRecipe({
                        name: 'Lemon',
                        quantity: 200
                    }),
                    new ProductRecipe({
                        name: 'Walnut',
                        quantity: 30
                    })
                ],
                time: 25,
                image: 'images/recipe/blue-cheese-pasta.jpg'
            });

            console.log('Recipes added....');


        }
    });
};


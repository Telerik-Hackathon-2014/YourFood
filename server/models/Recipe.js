'use strict';

var mongoose = require('mongoose'),
    ProductRecipeSchema = mongoose.model('ProductRecipe').schema,
    ProductRecipe = mongoose.model('ProductRecipe'),
    RecipeCategorySchema = mongoose.model('RecipeCategory').schema,
    RecipeCategory = mongoose.model('RecipeCategory');

var recipeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    category: [RecipeCategorySchema],
    products: [ProductRecipeSchema]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.seedInitialRecipes = function () {
    Recipe.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            var product = new ProductRecipe({name: "Apple"});
            var category = new RecipeCategory({name: "home-made"});
            Recipe.create({name: 'Banitsa', description: "Mnoo wkusna", category: [category], products: [product]});

            product = new ProductRecipe({name: "Port"});
            category = new RecipeCategory({name: "home-made"});
            Recipe.create({name: 'Rulo stefani', description: "Pravish kaiva i redish qica, morkovi i kiseli krastavichki. Zavivash gi v kaimata. Pechesh i qdesh", category: [category], products: [product]});

            product = new ProductRecipe({name: "Cucumbers"});
            category = new RecipeCategory({name: "vegetarian"});
            Recipe.create({name: 'Vegetarianska salata', description: "Postna salata.... ama ubava", category: [category], products: [product]});
            console.log('Recipes added....');
        }
    });
};


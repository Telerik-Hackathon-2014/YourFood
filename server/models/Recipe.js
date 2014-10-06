'use strict';

var mongoose = require('mongoose'),
    ProductSchema = mongoose.model('ProductRecipe').schema,
    Product = mongoose.model('ProductRecipe'),
    RecipeCategorySchema = mongoose.model('RecipeCategory').schema,
    RecipeCategory = mongoose.model('RecipeCategory');

var recipeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    category: [RecipeCategorySchema],
    products: [ProductSchema]
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.seedInitialRecipes = function () {
    Recipe.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            var product = new RecipeCategory({name: "Apple"});
            var category = new Product({name: "home-made"});
            Recipe.create({name: 'Banitsa', description: "Mnoo wkusna", category: [category], products: [product]});
            console.log('Recipes added....');
        }
    });
};


'use strict';

var mongoose = require('mongoose'),
    ProductRecipeSchema = mongoose.model('ProductRecipe').schema,
    ProductRecipe = mongoose.model('ProductRecipe'),
    RecipeCategory = mongoose.model('RecipeCategory');

var recipeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    categoryName: { type: String },
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
            Recipe.create({name: 'Banitsa1', description: "Mnoo wkusna1", category: [category], products: [product]});
            Recipe.create({name: 'Banitsa2', description: "Mnoo wkusna2", category: [category], products: [product]});
            Recipe.create({name: 'Banitsa3', description: "Mnoo wkusna3", category: [category], products: [product]});

            product = new ProductRecipe({name: "Port"});
            category = new RecipeCategory({name: "home-made"});
            Recipe.create({name: 'Rulo stefani', description: "Pravish kaiva i redish qica, morkovi i kiseli krastavichki. Zavivash gi v kaimata. Pechesh i qdesh", category: [category], products: [product]});
            Recipe.create({name: 'Rulo stefani1', description: "Pravish kaiva2 i redish qica, morkovi i kiseli krastavichki. Zavivash gi v kaimata. Pechesh i qdesh", category: [category], products: [product]});
            Recipe.create({name: 'Rulo stefani2', description: "Pravish kaiva i daredish qica, morkovi i kiseli krastavichki. Zavivash gi v kaimata. Pechesh i qdesh", category: [category], products: [product]});
            Recipe.create({name: 'Rulo stefani3', description: "Pravish kaiva adsai redish qica, morkovi i kiseli krastavichki. Zavivash gi v kaimata. Pechesh i qdesh", category: [category], products: [product]});
            Recipe.create({name: 'Rulo stefani4', description: "Pravish kaiva idsa redish qica, morkovi i kiseli krastavichki. Zavivash gi v kaimata. Pechesh i qdesh", category: [category], products: [product]});
            Recipe.create({name: 'Rulo stefan5', description: "Pravish kaiva i redish qica, morkovi i kiseli krastavichki. Zavivash gi v kaimata. Pechesh i qdedsash", category: [category], products: [product]});

            product = new ProductRecipe({name: "Cucumbers"});
            category = new RecipeCategory({name: "vegetarian"});
            Recipe.create({name: 'Vegetarianska salata', description: "Postna salata.... ama ubava", category: [category], products: [product]});
            Recipe.create({name: 'Vegetarianska salata6', description: "Postnddda salata.... ama ubava", category: [category], products: [product]});
            Recipe.create({name: 'Vegetarianska salat7', description: "Postaana salata.... ama ubava", category: [category], products: [product]});
            Recipe.create({name: 'Vegetarianska salata8', description: "Postnaaas salata.... ama ubava", category: [category], products: [product]});
            console.log('Recipes added....');
        }
    });
};


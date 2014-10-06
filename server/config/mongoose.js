var mongoose = require('mongoose'),
    models = require('../models');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            return;
        }

        console.log('Database up and running');
    });

    db.on('error', function (err) {
        console.log('db error! ' + err);
    });

    models.user.seedInitialUsers();
    models.category.seedInitialCategories();
    models.catalogProduct.seedInitialCatalogProducts();
    models.product.seedInitialProducts();
    models.recipe.seedInitialRecipes();
    models.recipeCategory.seedInitialRecipeCategories();
    models.productRecipe.seedInitialProductRecipes();
    models.shoppingList.seedInitialLists();
};
'use strict';

var mongoose = require('mongoose');

var recipeCategorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true}
});

var RecipeCategory = mongoose.model('RecipeCategory', recipeCategorySchema);

module.exports.seedInitialRecipeCategories = function () {
    RecipeCategory.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find categories ' + err);
        }

        if (collection.length === 0) {
            RecipeCategory.create({name: 'Breakfast'});
            RecipeCategory.create({name: 'Lunch'});
            RecipeCategory.create({name: 'Beverage'});
            RecipeCategory.create({name: 'Appetizer'});
            RecipeCategory.create({name: 'Soup'});
            RecipeCategory.create({name: 'Salad'});
            RecipeCategory.create({name: 'Main dish'});
            RecipeCategory.create({name: 'Side dish'});
            RecipeCategory.create({name: 'Dessert'});
            RecipeCategory.create({name: 'Bread'});
            console.log('Recipe Categories added....');
        }
    });
};
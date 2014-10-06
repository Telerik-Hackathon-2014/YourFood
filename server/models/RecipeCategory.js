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
            RecipeCategory.create({name: 'salad'});
            console.log('Recipe Categories added....');
        }
    });
};
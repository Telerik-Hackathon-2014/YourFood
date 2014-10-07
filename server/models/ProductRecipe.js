'use strict';

var mongoose = require('mongoose');

var productRecipeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    quantity: { type: Number }
});

var ProductRecipe = mongoose.model('ProductRecipe', productRecipeSchema);

module.exports.seedInitialProductRecipes = function () {
    ProductRecipe.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            ProductRecipe.create({name: 'Apple'});
            console.log('Product recipes added....');
        }
    });
};


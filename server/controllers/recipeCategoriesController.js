'use strict';

var RecipeCategory = require('mongoose').model('RecipeCategory');

module.exports = {
    createRecipeCategory: function (req, res) {
        var newRecipeCategoryData = req.body;

        RecipeCategory.create(newRecipeCategoryData, function (err, recipeCategory) {
            if (err) {
                console.log('Failed to create recipe category: ' + err);
                return;
            }

            res.send(recipeCategory);
            res.end();
        });
    },
    updateRecipeCategory: function (req, res) {
        var newRecipeCategoryData = req.body;

        if (req.body._id && RecipeCategory.findOne({_id: req.body._id})) {
            RecipeCategory.update({_id: req.body._id}, newRecipeCategoryData, function () {
                res.send(newRecipeCategoryData);
                res.end();
            });
        }
    },
    getAllRecipeCategories: function (req, res) {
        RecipeCategory.find({})
            .exec(function (err, collection) {
                if (err) {
                    console.log('Trying to get all recipe categories did not work out: ' + err);
                    return;
                }

                res.send(collection);
                res.end();
            });
    },
    getRecipeCategoryById: function (req, res) {
        RecipeCategory.findById(req.params.id, function (err, recipeCategory) {
            if (err) {
                console.log('Recipe category looked by id could not be found: ' + err)
            }

            res.send(recipeCategory);
            res.end();
        })
    },
    removeRecipeCategory: function (req, res) {
        RecipeCategory.findById(req.body._id, function (err, recipeCategory) {
            recipeCategory.remove(function (err) {
                if (err) {
                    console.log('Recipe category could not be removed: ' + err);
                }

                res.end();
            });
        });
    }
};
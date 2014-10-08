'use strict';

var Recipe = require('mongoose').model('Recipe'),
    itemsPerPage = 10;

module.exports = {
    createRecipe: function (req, res, next) {
        console.log(req);
        var newRecipeData = req.body;

        Recipe.create(newRecipeData, function (err, product) {
            if (err) {
                console.log('Failed to create recipe: ' + err);
                return next(err);
            }

            res.send(product);
            res.end();
        });
    },
    updateRecipe: function (req, res) {
        var newRecipeData = req.body;

        if (req.body._id && Recipe.findOne({_id: req.body._id})) {
            Recipe.update({_id: req.body._id}, newRecipeData, function () {
                res.send(newRecipeData);
                res.end();
            });
        }
    },
    getAllRecipes: function (req, res) {
        // Paging and sorting via the route
        var page = 0,
            sortSettings = {},
            sortType = 'asc';

        if (req.query.page && req.query.page > 0){
            page = req.query.page;
        }

        if (req.query.sortType &&
            (req.query.sortType == 'asc' ||
             req.query.sortType == 'desc')){
            sortType = req.query.sortType;
        }

        if (req.query.orderByDescription) {
            sortSettings["description"] = sortType;
        }

        if (req.query.orderByCategory) {
            sortSettings["categoryName"] = sortType;
        }

        if (req.query.orderByName) {
            sortSettings["name"] = sortType;
        }

        Recipe.find({}, null,
            {
                skip: page * itemsPerPage,
                limit: itemsPerPage,
                sort: sortSettings
            })
            .exec(function (err, collection) {
                if (err) {
                    console.log('Trying to get all recipes did not work out: ' + err);
                    return;
                }

                res.send(collection);
                res.end();
            });
    },
    getRecipeById: function (req, res) {
        Recipe.findById(req.params.id, function (err, recipe) {
            if (err) {
                console.log('Recipe looked by id could not be found: ' + err)
            }

            res.send(recipe);
            res.end();
        })
    },
    removeRecipe: function (req, res) {

        Recipe.findById(req.body.id, function (err, recipe) {
            recipe.remove(function (err) {
                if (err) {
                    console.log('Recipe could not be removed: ' + err);
                }

                res.end();
            });
        });
    },
    // TODO: Must add to Recipe model person that creates the recipe so we can filter them
    getRecipesByUser: function (req, res) {

    }
};
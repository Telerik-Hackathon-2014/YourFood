var Category = require('mongoose').model('Category');

module.exports = {
    createCategory: function (req, res) {
        var newCategory = req.body;

        Category.create(newCategory, function (err, category) {
            if (err) {
                console.log('Failed to create category list: ' + err);
                return;
            }

            res.send(category);
            res.end();
        });
    },
    getAllCategories: function (req, res) {
        Category.find({})
            .exec(function (err, collection) {
                if (err) {
                    console.log('Trying to get all categories did not work out: ' + err);
                }

                res.send(collection);
                res.end();
            });
    },
    updateCategory: function (req, res) {
        var newCategoryData = req.body;

        if (req.body._id && Category.findOne({_id: req.body._id})) {
            Category.update({_id: newCategoryData._id}, newCategoryData, function () {
                res.end();
            });
        }
    },
    removeCategory: function(req, res) {
        var data = req.body;

        Category.remove({_id: data._id}, function(err) {
            if(err) {
                console.log('Trying to remove category did not work out: ' + err);
            }

            res.end();
        });
    },
    getCategoryById: function (req, res) {
        var categoryId = req.body._id;

        Category.findOne({_id: categoryId}).exec(function(err, category) {
            if (err) {
                console.log('Trying to get category did not work out: ' + err);
                return;
            }

            res.send(category);
            res.end();
        });
    }
};
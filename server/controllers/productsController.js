var Product = require('mongoose').model('Product'),
    encryption = require('../utilities/encryption');

module.exports = {
    createProduct: function (req, res, next) {
        var newProductData = req.body;

        Product.create(newProductData, function (err, product) {
            if (err) {
                console.log('Failed to create product: ' + err);
                return;
            }

            res.send(product);
            res.end();
        });
    },
    updateProduct: function (req, res) {
        var newProductData = req.body;

        if (req.body._id && Product.findOne({_id: req.body._id}) ) {
            Product.update({_id: req.body._id}, newProductData, function () {
                res.end();
            });
        }
    },
    getAllProducts: function (req, res) {
        Product.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Trying to get all products did not work out: ' + err);
            }

            res.send(collection);
        });
    }
};
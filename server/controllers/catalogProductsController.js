'use strict';

var CatalogProduct = require('mongoose').model('CatalogProduct');

module.exports = {
    createCatalogProduct: function (req, res, next) {
        var newProductData = req.body;

        CatalogProduct.create(newProductData, function (err, product) {
            if (err) {
                console.log('Failed to create product: ' + err);
                return;
            }

            res.send(product);
            res.end();
        });
    },
    updateCatalogProduct: function (req, res) {
        var newProductData = req.body;

        if (req.body._id && Product.findOne({_id: req.body._id}) ) {
            CatalogProduct.update({_id: req.body._id}, newProductData, function () {
                res.end();
            });
        }
    },
    getAllCatalogProducts: function (req, res) {
        CatalogProduct.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Trying to get all products did not work out: ' + err);
                return;
            }

            res.send(collection);
            res.end();
        });
    },
    getCatalogProduct: function (req, res) {
        var productId = req.body._id;

        CatalogProduct.findOne({_id: productId}).exec(function(err, product) {
            if(err) {
                console.log('Trying to get catalog product did not work out: ' + err);
                return;
            }

            res.send(product);
            res.end();
        });
    },
    deleteCatalogProduct: function(req, res) {
        var productId = req.body._id;

        CatalogProduct.remove({_id: productId}, true).exec(function(err) {
            if(err) {
                console.log('Trying to get catalog product did not work out: ' + err);
                return;
            }

            res.end();
        });
    }
};
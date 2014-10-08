'use strict';

var CatalogProduct = require('mongoose').model('CatalogProduct'),
    itemsPerPage = 15;

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

        if (req.body._id && CatalogProduct.findOne({_id: req.body._id})) {
            CatalogProduct.update({_id: req.body._id}, newProductData, function () {
                res.end();
            });
        }
    },
    getAllCatalogProducts: function (req, res) {
        // Paging and sorting via route params
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

        if (req.query.orderByName) {
            sortSettings["name"] = sortType;
        }

        if (req.query.orderByCategory) {
            sortSettings["category"] = sortType;
        }

        if (req.query.orderByLifeTime) {
            sortSettings["lifetime"] = sortType;
        }

        CatalogProduct.find({}, null,
            {
                skip: page * itemsPerPage,
                limit: itemsPerPage,
                sort: sortSettings
            })
            .exec(function (err, collection) {
                if (err) {
                    console.log('Trying to get all products did not work out: ' + err);
                    return;
                }

                res.send(collection);
                res.end();
            });
    },
    getCatalogProductById: function (req, res) {
        var productId = req.body._id;

        CatalogProduct.findOne({_id: productId}).exec(function (err, product) {
            if (err) {
                console.log('Trying to get catalog product did not work out: ' + err);
                return;
            }

            res.send(product);
            res.end();
        });
    },
    removeCatalogProduct: function (req, res) {

        CatalogProduct.findById(req.body.id, function (err, ctProduct) {
            ctProduct.remove(function (err) {
                if (err) {
                    console.log('Catalog product could not be removed: ' + err);
                }

                res.end();
            });
        });
    }
};
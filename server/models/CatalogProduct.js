'use strict';

var mongoose = require('mongoose');

var catalogProductSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    categoryName: { type: String, required: true},
    lifetime: { type: Number, required: true},
    unit: {type: String},
    image: {type: String}
});

var CatalogProduct = mongoose.model('CatalogProduct', catalogProductSchema);

module.exports.seedInitialCatalogProducts = function () {
    CatalogProduct.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            CatalogProduct.create({
                name: 'Pasta',
                categoryName: 'Breads',
                lifetime: 60,
                unit: 'gr',
                image: 'images/product/pasta.jpg'
            });

            CatalogProduct.create({
                name: 'Broccoli',
                categoryName: 'Vegetable',
                lifetime: 10,
                unit: 'gr',
                image: 'images/product/broccoli.png'
            });

            CatalogProduct.create({
                name: 'Cooking cream',
                categoryName: 'Dairy',
                lifetime: 7,
                unit: 'gr',
                image: 'images/product/cooking-cream.jpg'
            });

            CatalogProduct.create({
                name: 'Blue cheese',
                categoryName: 'Dairy',
                lifetime: 9,
                unit: 'gr',
                image: 'images/product/cheese.jpg'
            });

            CatalogProduct.create({
                name: 'Lemon',
                categoryName: 'Fruit',
                lifetime: 21,
                unit: 'gr',
                image: 'images/product/lemon.jpg'
            });

            CatalogProduct.create({
                name: 'Walnut',
                categoryName: 'Nut',
                lifetime: 60,
                unit: 'gr',
                image: 'images/product/walnut.jpg'
            });
            console.log('Catalog products added....');
        }




    });
};


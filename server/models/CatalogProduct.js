'use strict';

var mongoose = require('mongoose');

var catalogProductSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    category: { type: String, required: true},
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
            CatalogProduct.create({name: 'Pineapple', category: 'fruit', lifetime: 5});
            CatalogProduct.create({name: 'Banana', category: 'fruit', lifetime: 5});
            CatalogProduct.create({name: 'Pork meat', category: 'meat', lifetime: 3});
            CatalogProduct.create({name: 'Milk', category: 'dairy', lifetime: 8});
            CatalogProduct.create({name: 'Croasant', category: 'other', lifetime: 2});
            console.log('Catalog products added....');
        }

        CatalogProduct.create({
            name: 'Pasta',
            categoryName: 'Breads',
            lifetime: 60,
            unit: 'gr',
            image: '../../public/images/product/pasta.jpg'
        });

        CatalogProduct.create({
            name: 'Broccoli',
            categoryName: 'Vegetable',
            lifetime: 10,
            unit: 'gr',
            image: '../../public/images/product/broccoli.png'
        });

        CatalogProduct.create({
            name: 'Cooking cream',
            categoryName: 'Dairy',
            lifetime: 7,
            unit: 'gr',
            image: '../../public/images/product/cooking-cream.jpg'
        });

        CatalogProduct.create({
            name: 'Blue cheese',
            categoryName: 'Dairy',
            lifetime: 9,
            unit: 'gr',
            image: '../../public/images/product/cheese.jpg'
        });

        CatalogProduct.create({
            name: 'Lemon',
            categoryName: 'Fruit',
            lifetime: 21,
            unit: 'gr',
            image: '../../public/images/product/lemon.jpg'
        });

        CatalogProduct.create({
            name: 'Walnut',
            categoryName: 'Nut',
            lifetime: 60,
            unit: 'gr',
            image: '../../public/images/product/walnut.jpg'
        });


    });
};


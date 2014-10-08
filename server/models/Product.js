'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    categoryName: { type: String },
    categoryImage: { type: String },
    quantity: { type: Number },
    expirationDate: { type: Date },
    purchaseDate: {type: Date, default: Date.now }
});

var Product = mongoose.model('Product', productSchema);

module.exports.seedInitialProducts = function () {
    Product.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            Product.create({
                name: 'Pasta',
                image: '../../public/images/product/pasta.jpg',
                categoryName: 'Breads',
                categoryImage: '../../public/images/product-category/bread.jpg',
                quantity: 1500,
                expirationDate: new Date(2014, 12, 12),
                purchaseDate: new Date()
            });

            Product.create({
                name: 'Broccoli',
                image: '../../public/images/product/broccoli.png',
                categoryName: 'Vegetable',
                categoryImage: '../../public/images/product-category/vegetable.jpg',
                quantity: 500,
                expirationDate: new Date(2014, 12, 12),
                purchaseDate: new Date()
            });

            Product.create({
                name: 'Cooking cream',
                image: '../../public/images/product/cooking-creme.png',
                categoryName: 'Dairy',
                categoryImage: '../../public/images/product-category/dairy.jpg',
                quantity: 400,
                expirationDate: new Date(2014, 11, 21),
                purchaseDate: new Date()
            });

            Product.create({
                name: 'Blue cheese',
                image: '../../public/images/product/cheese.png',
                categoryName: 'Dairy',
                categoryImage: '../../public/images/product-category/dairy.jpg',
                quantity: 350,
                expirationDate: new Date(2014, 11, 24),
                purchaseDate: new Date()
            });

            Product.create({
                name: 'Lemon',
                image: '../../public/images/product/lemon.jpg',
                categoryName: 'Fruit',
                categoryImage: '../../public/images/product-category/fruit.jpg',
                quantity: 700,
                expirationDate: new Date(2014, 12, 23),
                purchaseDate: new Date()
            });

            Product.create({
                name: 'Walnut',
                image: '../../public/images/product/walnut.jpg',
                categoryName: 'Nut',
                categoryImage: '../../public/images/product-category/nut.jpg',
                quantity: 400,
                expirationDate: new Date(2015, 2, 7),
                purchaseDate: new Date()
            });

            console.log('Products added....');
        }
    });
};
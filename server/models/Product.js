'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    categoryName: { type: String },
    categoryImage: { type: String },
    quantity: { type: Number },
    expirationDate: {type: Date },
    purchaseDate: {type: Date, default: Date.now }
});

var Product = mongoose.model('Product', productSchema);

module.exports.seedInitialProducts = function () {
    Product.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            var category = new Category({name: 'salad'});
            Product.create({name: 'Apple', category: [category], expirationDate: new Date(2014, 12, 12)});
            console.log('Products added....');
        }
    });
};
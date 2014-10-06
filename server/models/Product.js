'use strict';

var mongoose = require('mongoose'),
    CategorySchema = mongoose.model('Category').schema,
    Category = mongoose.model('Category');

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: [CategorySchema],
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
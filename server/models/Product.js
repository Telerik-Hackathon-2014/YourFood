'use strict';

var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    category: { type: String, required: true},
    quantity: { type: Number},
    expirationDate: {type: Date},
    purchaseDate: {type: Date, default: Date.now}
});

var Product = mongoose.model('Product', productSchema);

module.exports.seedInitialProducts = function () {
    Product.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            Product.create({name: 'Apple', category: 'fruit', expirationDate: new Date(2014, 12, 12)});
            console.log('Products added....');
        }
    });
};


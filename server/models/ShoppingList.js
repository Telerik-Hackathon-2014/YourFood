'use strict';

var mongoose = require('mongoose'),
    ProductSchema = mongoose.model('Product').schema,
    Product = mongoose.model('Product');

var shoppingListSchema = mongoose.Schema({
    products: [ProductSchema],
    dateCreated: { type: Date, default: Date.now},
    dateClosed: { type: Date}
});

var ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports.seedInitialLists = function () {
    ShoppingList.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            ShoppingList.create({name: 'Apple', expirationDate: new Date(2014, 12, 12)});
            console.log('Lists added....');
        }
    });
};


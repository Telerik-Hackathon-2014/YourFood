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

//        var product =  new Product({name: 'Tomato', category: 'fruit', expirationDate: new Date(2014, 12, 12)});
//        ShoppingList.create({products:[product]});

        if (collection.length === 0) {
            Product.find({}).exec(function (err, collection) {

                console.log('Lists added....');
            });
        }
    });
};


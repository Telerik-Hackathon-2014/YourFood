'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    ProductRecipe = mongoose.model('ProductRecipe');

var shoppingListSchema = mongoose.Schema({
    products: [mongoose.Schema.Types.ObjectId],
    dateCreated: { type: Date, default: Date.now },
    dateClosed: { type: Date }
});

var ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports.seedInitialLists = function () {
    ShoppingList.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            Product.find({}).exec(function (err, collection) {
                if (err) {
                    console.log('Products for shopping not found: '+err);
                }

                var productsIds = [];
                for(var productIndex in collection) {
                    productsIds.push(collection[productIndex]._id);
                }

                ShoppingList.create({products: productsIds});
                ShoppingList.create({products: [productsIds[0]]});
                ShoppingList.create({products: [productsIds[1]]});
                console.log('Lists added....');
            });
        }
    });
};


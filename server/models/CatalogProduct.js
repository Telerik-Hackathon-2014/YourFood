'use strict';

var mongoose = require('mongoose');

var catalogProductSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    category: { type: String, required: true},
    lifetime: { type: Number, required: true}
});

var CatalogProduct = mongoose.model('CatalogProduct', catalogProductSchema);

module.exports.seedInitialProducts = function () {
    CatalogProduct.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

//        if (collection.length === 0) {
//            CatalogProduct.create({name: 'Apple', category: 'fruit', expirationDate: new Date(2014, 12, 12)});
//            console.log('Products added....');
//        }
    });
};


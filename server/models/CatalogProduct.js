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
            console.log('Catalog products added....');
        }
    });
};


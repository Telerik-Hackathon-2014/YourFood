'use strict';

var mongoose = require('mongoose');

var shoppingListProductSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    categoryName: { type: String, required: true},
    categoryImage: { type: String },
    unit: {type: String},
    quantity: {type: Number},
    image: {type: String}
});

var ShoppingListProduct = mongoose.model('ShoppingListProduct', shoppingListProductSchema);


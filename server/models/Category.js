'use strict';

var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    image: { type: String }
});

var Category = mongoose.model('Category', categorySchema);

module.exports.seedInitialCategories = function () {
    Category.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find categories ' + err);
        }

        if (collection.length === 0) {
            Category.create({name: 'Meat', image: '../../public/images/product-category/meat.png'});
            Category.create({name: 'Dairy', image: '../../public/images/product-category/dairy.png'});
            Category.create({name: 'Fruit', image: '../../public/images/product-category/fruit.png'});
            Category.create({name: 'Vegetable', image: '../../public/images/product-category/vegetable.png'});
            Category.create({name: 'Seasoning', image: '../../public/images/product-category/seasoning.png'});
            Category.create({name: 'Sauce', image: '../../public/images/product-category/sauce.png'});
            Category.create({name: 'Breads', image: '../../public/images/product-category/wheat.png'});
            console.log('Categories added....');
        }
    });
};
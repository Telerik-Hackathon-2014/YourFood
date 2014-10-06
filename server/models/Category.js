'use strict';

var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true}
});

var Category = mongoose.model('Category', categorySchema);

module.exports.seedInitialCategories = function () {
    Category.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find categories ' + err);
        }

        if (collection.length === 0) {
            Category.create({name: 'Vegetarian'});
            console.log('Categories added....');
        }
    });
};
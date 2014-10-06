var mongoose = require('mongoose'),
    user = require('../models/User'),
    product = require('../models/Product'),
    shoppingList = require('../models/ShoppingList');

module.exports = function(config){
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function(err){
        if (err) {
            return;
        }

        console.log('Database up and running');
    });

    db.on('error', function(err){
        console.log('db error! ' + err);
    });

    user.seedInitialUsers();
    product.seedInitialProducts();
    shoppingList.seedInitialLists();
};
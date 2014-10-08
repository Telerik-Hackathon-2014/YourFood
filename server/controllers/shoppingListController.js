var ShoppingList = require('mongoose').model('ShoppingList'),
    User = require('mongoose').model('User');

module.exports = {
    createShoppingList: function (req, res) {
        var newShoppingList = req.body;

        ShoppingList.create(newShoppingList, function (err, shoppingList) {
            if (err) {
                console.log('Failed to create shopping list: ' + err);
                return;
            }

            res.send(shoppingList);
            res.end();
        });
    },
    getShoppingListsHistory: function (req, res) {
        var userId = req.params.id;

        User.findById({_id: userId}, function(user) {
            ShoppingList.find({})
                .where('_id')
                .in(user.shoppingListsHistory)
                .exec(function (err, collection) {
                    if (err) {
                        console.log('Trying to get all shopping lists did not work out: ' + err);
                    }

                    res.send(collection);
                    res.end();
                });
        });
    },
    getShoppingList: function (req, res) {
        var shoppingListId = req.params.id;
        ShoppingList.findOne({_id: shoppingListId}).exec(function(err, list) {
            if(err) {
                console.log('Trying to get shopping list did not work out: ' + err);
            }

            res.send(list);
            res.end();
        });
    },
    addProductToShoppingList: function(req, res) {
        var data = req.body;

        ShoppingList.findOne({_id: data.id}).exec(function(err, list) {
            if(err) {
                console.log('Trying to get shopping list did not work out: ' + err);
            }

            list.products.push(data.productId);

            res.send(list);
            res.end();
        });
    },
    removeProductFromShoppingList: function(req, res) {
        var data = req.body;

        ShoppingList.findOne({_id: data.id}).exec(function(err, list) {
            if(err) {
                console.log('Trying to get shopping list did not work out: ' + err);
            }

            list.products.splice(list.indexOf(data.productId), 1);

            res.send(list);
            res.end();
        });
    },
    removeShoppingList: function (req, res) {
        ShoppingList.findById(req.body.id, function (err, shoppingList) {
            shoppingList.remove(function (err) {
                if (err) {
                    console.log('Shopping list could not be removed: ' + err);
                }

                res.end();
            });
        });
    }
};
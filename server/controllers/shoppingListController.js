var ShoppingList = require('mongoose').model('ShoppingList');

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
    getAllShoppingListsByUser: function (req, res) {
        var userData = req.body;

        ShoppingList.find({})
            .where('_id')
            .in(userData.shoppingListsHistory)
            .exec(function (err, collection) {
                if (err) {
                    console.log('Trying to get all shopping lists did not work out: ' + err);
                }

            res.send(collection);
        });
    },
    getShoppingList: function (req, res) {
        var data = req.body;

        ShoppingList.findOne({_id: data.id}).exec(function(err, list) {
            if(err) {
                console.log('Trying to get shopping list did not work out: ' + err);
            }

            res.send(list);
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
        });
    }
};
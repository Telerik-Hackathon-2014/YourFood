var mongoose = require('mongoose'),
    ShoppingList = mongoose.model('ShoppingList'),
    User = mongoose.model('User'),
    ShoppingListProduct = mongoose.model('ShoppingListProduct');

module.exports = {
    createShoppingList: function (req, res) {
        // TODO: IF needed
    },
    getShoppingListsHistory: function (req, res) {
        var userId = req.params.id;

        User.findById({_id: userId}, function (user) {
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
        ShoppingList.findOne({_id: shoppingListId}).exec(function (err, list) {
            if (err) {
                console.log('Trying to get shopping list did not work out: ' + err);
            }

            res.send(list);
            res.end();
        });
    },
    closeShoppingList: function (req, res) {
        var userId = req.body.id;

        User.findById(userId).exec(function (err, user) {
            if (err) {
                console.log('Could not find user for shopping list modification: ' + err)
            }

            ShoppingList.findByIdAndUpdate(
                user.shoppingList,
                {$set: {
                    "dateClosed": new Date()
                }},
                {safe: true, upsert: true},
                function (err, list) {
                    if (err) {
                        console.log('Could not update or find user for shoplist modifications: ' + err);
                    }

                    ShoppingList.create({dateCreated: new Date(), products: []},
                        function (err, newList) {
                            if (err) {
                                console.log('Shop list for user not created: ' + err);
                            }

                            user.shoppingList = newList._id;
                            user.shoppingListsHistory.push(list._id);

                            for (var i = 0; i < list.products.length; i += 1) {
                                user.availableProducts.push(list.products[i]);
                            }

                            user.save(function (err, user) {
                                if (err) {
                                    console.log('Could not save user changes in shopping list: ' + err);
                                }
                            });

                            res.send(list);
                            res.end();
                        });
                }
            );
        });

    },
    addProductToShoppingList: function (req, res) {
        var newProductData = new ShoppingListProduct(req.body),
            listId = req.params.id;

        ShoppingList.findById(listId,
            function (err, list) {
                if (err) {
                    console.log('could not find list to add product in it: ' + err);
                }

                for (var product in list.products) {
                    if (product.name == newProductData.name) {
                        res.statusCode(404);
                        res.send('Product already exists in list');
                        res.end();
                    }
                }

                ShoppingList.findByIdAndUpdate(
                    listId,
                    {$push: {"products": newProductData}},
                    {safe: true, upsert: true},
                    function (err, list) {
                        if (err) {
                            console.log(err);
                        }

                        res.send(list);
                        res.end();
                    }
                );
            })
    },
    removeProductFromShoppingList: function (req, res) {
        var data = req.body;

        ShoppingList.findOne({_id: data.id}).exec(function (err, list) {
            if (err) {
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
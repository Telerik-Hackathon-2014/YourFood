'use strict';

app.factory('shoppingListData',
    function ($http, notifier) {
        var shoppingListApi = 'api/shopping-list';

        return{
            getShoppingList: function (id, success) {
                $http.get(shoppingListApi + '/' + id)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get shopping list');
                    });
            },
            getShoppingListHistory: function (id, success) {
                $http.get(shoppingListApi + '/history/' + id)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get shopping list by id');
                    })
            },
            addProductToShoppingList: function (id, product, success) {
                $http.post(shoppingListApi + '/' + id, product)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Product already in list')
                    })
            },
            addListToFridge: function (id,success) {
                $http.put(shoppingListApi + '/' + id)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (data) {
                        notifier.error('List was not added to fridge.')
                    })
            }
        }
    });

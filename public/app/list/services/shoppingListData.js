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
            }
        }
    });

'use strict';

app.controller('ShoppingListCtrl', function ($scope, $location, identity, shoppingListData, notifier) {
    if(!identity.isAuthenticated()) {
        $location.path('/login');
        return;
    }

    var listId = identity.currentUser().shoppingList;

    $scope.isLogged = identity.isAuthenticated();

    $scope.addListToFridge = function () {
        shoppingListData.addListToFridge(listId, function () {
            notifier.success('List added to fridge');
            $location.path('/');
        })
    };

    shoppingListData.getShoppingList(listId, function(shoppingList) {
        $scope.shoppingList = shoppingList;
    });
});

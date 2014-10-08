'use strict';

app.controller('ShoppingListCtrl', function ($scope, identity, shoppingListData) {
    $scope.isLogged = identity.isAuthenticated();
    var listId = identity.currentUser().shoppingList;

    shoppingListData.getShoppingList(listId, function(shoppingList) {
        $scope.shoppingList = shoppingList;
    });
});

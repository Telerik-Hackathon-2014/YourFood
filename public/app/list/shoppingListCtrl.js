'use strict';

app.controller('ShoppingListCtrl', function ($scope, $location, identity, shoppingListData) {
    if(!identity.isAuthenticated()) {
        $location.path('/login');
        return;
    }

    $scope.isLogged = identity.isAuthenticated();
    var listId = identity.currentUser().shoppingList;

    shoppingListData.getShoppingList(listId, function(shoppingList) {
        $scope.shoppingList = shoppingList;
    });
});

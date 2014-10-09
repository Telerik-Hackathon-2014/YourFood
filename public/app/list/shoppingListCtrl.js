'use strict';

app.controller('ShoppingListCtrl', function ($scope, $location, identity, shoppingListData, notifier) {
    if (!identity.isAuthenticated()) {
        $location.path('/login');
        return;
    }

    var listId = identity.currentUser().shoppingList,
        currentUserId = identity.currentUser()._id;

    $scope.isLogged = identity.isAuthenticated();

    $scope.addListToFridge = function () {
        console.log(listId);
        shoppingListData.addListToFridge(listId, {id: currentUserId}, function (data) {
            identity.setCurrentUser(data);
            notifier.success('List added to fridge');
            $location.path('/');
        })
    };

    shoppingListData.getShoppingList(listId, function (shoppingList) {
        $scope.shoppingList = shoppingList;
    });
});

'use strict';

app.controller('ProductDetailsCtrl', function ($scope, $routeParams, $location, identity, productsData, notifier, shoppingListData) {
    if(!identity.isAuthenticated()) {
        $location.path('/login');
        return;
    }

    $scope.currentUserShoppingListId = identity.currentUser().shoppingList;

    $scope.isLogged = identity.isAuthenticated();

    $scope.productId = $routeParams.id;

    $scope.quantity = 1000;

    productsData.getProductById($scope.productId,
        function (data) {
            $scope.product = data;
        });
    
    $scope.addToShoppingList = function (quantity) {
        $scope.product.quantity = quantity;

        shoppingListData.addProductToShoppingList($scope.currentUserShoppingListId, $scope.product,
            function () {
                notifier.success('Product added to shopping list');
            });
    }

    $scope.addToFridge = function (quantity) {
        $scope.product.quantity = quantity;

        productsData.addProductToFridge(identity.currentUser()._id, $scope.product, function() {
            notifier.success('Product added to fridge');
        });
    };
});
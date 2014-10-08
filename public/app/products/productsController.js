'use strict';

app.controller('ProductsController', function ($scope, identity, productsData) {
    $scope.identity = identity;
    $scope.isLogged = identity.isAuthenticated();

    productsData.getAllProducts(
        function (data) {
            $scope.catalogProducts = data;
        });
});
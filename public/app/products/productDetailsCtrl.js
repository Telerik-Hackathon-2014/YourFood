'use strict';

app.controller('ProductDetailsCtrl', function ($scope, $routeParams, identity, productsData) {
    $scope.isLogged = identity.isAuthenticated();

    $scope.productId = $routeParams.id;

    productsData.getProductById($scope.productId,
        function (data) {
            $scope.currentCatalogProduct = data;
        })
});
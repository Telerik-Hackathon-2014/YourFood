'use strict';

app.controller('ProductsController', function ($scope, identity, productsData) {
    $scope.identity = identity;
    $scope.isLogged = identity.isAuthenticated();
    $scope.filter = {};
    $scope.filter.page = $scope.filter.page || 1;
    $scope.filter.sortType = $scope.filter.sortType || 'asc';

    function getProducts() {
        productsData.getAllProducts(
            $scope.filter,
            function (data) {
                $scope.catalogProducts = data;
            });
    }

    $scope.nextPage = function () {
        if (!$scope.recipes) {
            return;
        }
        if ($scope.recipes.length < 10) {
            return;
        }

        $scope.filter.page++;
        getProducts();
    };

    $scope.prevPage = function () {
        if ($scope.filter.page > 1) {
            $scope.filter.page--;
            getProducts();
        }
    };

    $scope.oneAtATime = true;

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $scope.sort = function () {
        getProducts();
    };



    getProducts();
});
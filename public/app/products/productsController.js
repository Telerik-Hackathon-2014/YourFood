'use strict';

app.controller('ProductsController', function ($scope, identity, productsData) {
    var MS_PER_DAY = 1000 * 60 * 60 * 24;
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
        if (!$scope.catalogProducts) {
            return;
        }
        if ($scope.catalogProducts.length < 10) {
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

    if (identity.isAuthenticated()) {
        productsData.getAvailableProducts(identity.currentUser()._id, function (availableProducts) {
            $scope.availableProducts = availableProducts;
        });
    }

    getProducts();
});
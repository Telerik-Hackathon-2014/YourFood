app.controller('ProductsController', function ($scope, identity) {
    $scope.identity = identity;
    $scope.isLogged = identity.isAuthenticated();

    $scope.products = [
        {
            name: "pesho",
            category: "gosho"
        },
        {
            name: "ivan",
            category: "ivanivan"
        },
        {
            name: "zaa",
            category: "zaa"
        }
    ];

    $scope.catalogueProducts = $scope.products;
});
app.controller('CreateProductCategoryController', function ($scope, $routeParams, $location, notifier, YourFoodService) {
    $scope.createCategory = function (category) {
        YourFoodService.createProductCategory(category)
            .then(function () {
                notifier.success('Product category was created successfully!');
                $location.path('/admin/products/categories');
            });
    };
});
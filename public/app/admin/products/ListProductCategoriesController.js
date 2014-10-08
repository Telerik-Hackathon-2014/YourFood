app.controller('ListProductCategoriesController', function ($scope, YourFoodService) {
    YourFoodService.getProductCategoryNames()
        .then(function (collection) {
            $scope.categories = collection;
        });
});
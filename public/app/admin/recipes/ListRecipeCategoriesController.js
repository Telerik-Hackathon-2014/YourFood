app.controller('ListRecipeCategoriesController', function ($scope, YourFoodService) {
    YourFoodService.getRecipeCategoryNames()
        .then(function (collection) {
            $scope.categories = collection;
        });
});
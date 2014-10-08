app.controller('CreateRecipeCategoryController', function ($scope, $routeParams, $location, notifier, YourFoodService) {
    $scope.createCategory = function (category) {
        YourFoodService.createRecipeCategory(category)
            .then(function () {
                notifier.success('Category was created successfully!');
                $location.path('/admin/recipes/categories');
            });
    };
});
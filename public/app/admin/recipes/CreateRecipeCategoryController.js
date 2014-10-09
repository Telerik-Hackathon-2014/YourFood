app.controller('CreateRecipeCategoryController', function ($scope, $routeParams, $location, notifier, YourFoodService, identity) {
    if(!identity.isAuthenticated()) {
        $location.path('/');
        return;
    }

    $scope.createCategory = function (category) {
        YourFoodService.createRecipeCategory(category)
            .then(function () {
                notifier.success('Category was created successfully!');
                $location.path('/admin/recipes/categories');
            });
    };
});
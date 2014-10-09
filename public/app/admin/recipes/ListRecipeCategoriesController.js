app.controller('ListRecipeCategoriesController', function ($scope, YourFoodService, identity) {
    if(!identity.isAuthenticated()) {
        $location.path('/');
        return;
    }

    YourFoodService.getRecipeCategoryNames()
        .then(function (collection) {
            $scope.categories = collection;
        });
});
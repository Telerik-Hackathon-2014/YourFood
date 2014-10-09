app.controller('ListProductCategoriesController', function ($scope, YourFoodService, identity) {
    if(!identity.isAuthenticated()) {
        $location.path('/');
        return;
    }

    YourFoodService.getProductCategoryNames()
        .then(function (collection) {
            $scope.categories = collection;
        });
});
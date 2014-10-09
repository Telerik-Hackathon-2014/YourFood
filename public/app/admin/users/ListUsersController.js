app.controller('ListUsersController', function ($scope, YourFoodService, identity) {
    if(!identity.isAuthenticated()) {
        $location.path('/');
        return;
    }

    YourFoodService.getUsers()
        .then(function (data) {
            $scope.users = data;
        })
});
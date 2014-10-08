app.controller('ListUsersController', function ($scope, YourFoodService) {
    YourFoodService.getUsers()
        .then(function (data) {
            $scope.users = data;
        })
});
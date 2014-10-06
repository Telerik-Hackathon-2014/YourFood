app.controller('ProfileCtrl', function ($scope, $location, auth, identity) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    };

    $scope.update = function (user) {
        auth.update(user).then(function () {
            $scope.user.firstName = user.firstName;
            $scope.user.lastName = user.lastName;
            $location.path('/');
        })
    }
});
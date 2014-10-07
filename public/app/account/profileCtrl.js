app.controller('ProfileCtrl', function ($scope, $location, auth, identity) {
    $scope.user = identity.currentUser();

    $scope.updateInformation = function (user) {
        auth.updateInformation(user).then(function () {
            $scope.user.firstName = user.firstName;
            $scope.user.lastName = user.lastName;
            $scope.user.email = user.email;
            $location.path('/');
        })
    };

    $scope.updatePassword = function (password) {

    };
});
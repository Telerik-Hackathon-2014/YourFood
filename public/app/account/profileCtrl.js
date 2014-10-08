app.controller('ProfileCtrl', function ($scope, $location, auth, identity, notifier) {
    var userInfo = identity.currentUser();

    $scope.user = {
        _id: userInfo._id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email
    };

    $scope.updateInformation = function (user) {
        auth.updateInformation(user).then(function () {
            $scope.user.firstName = user.firstName;
            $scope.user.lastName = user.lastName;
            $scope.user.email = user.email;
            $location.path('/');
        })
    };

    $scope.updatePassword = function (form) {
        if (form.password !== form.confirmPassword) {
            notifier.error('Different passwords');
            alert('Different passwords');
            return;
        }

        var user = {
            _id: $scope.user._id,
            password: form.password
        };

        auth.updateInformation(user).then(function () {
            $location.path('/');
        })
    };
});
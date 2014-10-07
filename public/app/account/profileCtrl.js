app.controller('ProfileCtrl', function ($scope, $location, auth, identity, notifier) {
    $scope.user = identity.currentUser();

    $scope.updateInformation = function (user) {
        console.log(user);
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
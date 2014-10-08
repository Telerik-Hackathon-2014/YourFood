app.factory('auth', function ($q, $http, identity, UsersResource) {

    return {
        signup: function (user) {
            var deferred = $q.defer();

            $http.post('/api/users', user).success(function (response) {
                deferred.resolve(true);
            }, function (err) {
                deferred.reject(err.err);
            });

            return deferred.promise;
        },
        updateInformation: function (user) {
            var deferred = $q.defer();

            $http.put('api/users', user).success(function (response) {
                identity.setCurrentUser(response);

                deferred.resolve(true);
            });

            return deferred.promise;
        },
        login: function (user) {
            var deferred = $q.defer();

            $http.post('/login', user).success(function (response) {
                if (response.success) {
                    var user = new UsersResource();
                    angular.extend(user, response.user);
                    identity.setCurrentUser(user);
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post('/logout').success(function () {
                identity.setCurrentUser(undefined);
                deferred.resolve(true);
            });

            return deferred.promise;
        },
        isAuthenticated: function () {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedForRole: function (role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
});
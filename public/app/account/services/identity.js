app.factory('identity', function ($cookieStore, $window, UsersResource) {
    var cookieStorageUserKey = 'currentYourFoodUser';

    var currentUser;
    if ($window.bootstrappedUserObject) {
        currentUser = new UsersResource();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }

    return {
        currentUser: function () {
            return currentUser;
        },
        setCurrentUser: function (user) {
            if (user) {
                $cookieStore.put(cookieStorageUserKey, user);
            }
            else {
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        },
        isAuthenticated: function () {
            return !!this.currentUser();
        },
        isAuthorizedForRole: function (role) {
            return !!this.currentUser() && this.currentUser().roles.indexOf(role) > -1;
        },
        isAdmin: function () {
            // Ask if better to be called from usersResource.js
            return this.isAuthorizedForRole('admin');
        }
    }
});
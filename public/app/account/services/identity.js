app.factory('identity', function($cookieStore, UsersResource){
    var cookieStorageUserKey = 'currentYourFoodUser';

    var currentUser;
    return {
        currentUser: function () {
            var savedUser = $cookieStore.get(cookieStorageUserKey);
            if(savedUser){
                return savedUser;
            }

            return currentUser;
        },
        setCurrentUser: function (user) {
            if  (user){
                $cookieStore.put(cookieStorageUserKey, user);
            }
            else{
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        },
        isAuthenticated: function(){
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
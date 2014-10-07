app.factory('Utility', function () {
    return {
        getRandomString: function () {
            return Math.random().toString(36).substring(2, 15);
        }
    }
});
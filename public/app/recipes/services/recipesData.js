'use strict';

app.factory('recipesData',
    function ($http, notifier) {
        var recipesApi = 'api/recipes';

        return {
            getAllRecipes: function (success) {
                $http.get(recipesApi)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get recipes')
                    })
            },
            getRecipeById: function (id, success) {
                $http.get(recipesApi + '/' + id)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get the recipe you wanted :(');
                    })
            }
        }
    });
'use strict';

app.controller('RecipesCtrl',
    function ($scope, $routeParams, recipesData, identity) {

        $scope.isLogged = identity.isAuthenticated();

        $scope.test = 'HERE!';

        recipesData.getAllRecipes(
            function (data) {
                $scope.recipes = data;
            });
    });
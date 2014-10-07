'use strict';

app.controller('RecipesCtrl',
    function ($scope, $routeParams, recipesData, identity) {

        $scope.isLogged = identity.isAuthenticated();

        $scope.recipeId = $routeParams.id;

        $scope.test = 'HERE!';

        recipesData.getAllRecipes(
            function (data) {
                $scope.recipes = data;
            });

        recipesData.getRecipeById($scope.recipeId,
            function (data) {
                $scope.recipe = data;
            })
    });
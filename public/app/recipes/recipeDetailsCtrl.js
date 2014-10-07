'use strict';

app.controller('RecipeDetailsCtrl',
    function ($scope, $routeParams, recipesData, identity) {
        $scope.isLogged = identity.isAuthenticated();

        $scope.recipeId = $routeParams.id;

        recipesData.getRecipeById($scope.recipeId,
            function (data) {
                $scope.recipe = data;
            })
    });
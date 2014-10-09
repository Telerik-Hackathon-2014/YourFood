'use strict';

app.controller('RecipeDetailsCtrl',
    function ($scope, $routeParams, $location, recipesData, identity) {
        if(!identity.isAuthenticated()) {
            $location.path('/login');
            return;
        }

        $scope.isLogged = identity.isAuthenticated();

        $scope.recipeId = $routeParams.id;

        recipesData.getRecipeById($scope.recipeId,
            function (data) {
                $scope.recipe = data;
            })
    });
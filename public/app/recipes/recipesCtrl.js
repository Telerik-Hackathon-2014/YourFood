'use strict';

app.controller('RecipesCtrl',
    function ($scope, $routeParams, recipesData, identity) {

        $scope.isLogged = identity.isAuthenticated();

        recipesData.getAllRecipes(
            function (data) {
                $scope.recipes = data;
            });

        $scope.page = $scope.page || 1;

        $scope.nextPage = function () {
            $scope.page++;
        };

        $scope.prevPage = function () {
            if ($scope.page > 1) {
                $scope.page--;
            }
        };

        $scope.oneAtATime = true;

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.sort = function () {
            // TODO ADD FILTERS
        };
    });
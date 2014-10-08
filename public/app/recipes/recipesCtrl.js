'use strict';

app.controller('RecipesCtrl',
    function ($scope, $routeParams, recipesData, identity) {

        $scope.isLogged = identity.isAuthenticated();
        $scope.filter = {};
        $scope.filter.page = $scope.filter.page || 1;
        $scope.filter.sortType = $scope.filter.sortType || 'asc';

        function getRecipes() {
            recipesData.getAllRecipes(
                $scope.filter,
                function (data) {
                    $scope.recipes = data;
                });
        }

        $scope.nextPage = function () {
            if($scope.recipes.length < 10 || $scope.recipes == undefined)
            {
                return;
            }
            
            $scope.filter.page++;
            getRecipes();
        };

        $scope.prevPage = function () {
            if ($scope.filter.page > 1) {
                $scope.filter.page--;
                getRecipes();
            }
        };

        $scope.oneAtATime = true;

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.sort = function () {
            getRecipes();
        };

        getRecipes();
    });
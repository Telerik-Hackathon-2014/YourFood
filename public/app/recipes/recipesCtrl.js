'use strict';

app.controller('RecipesCtrl',
    function ($scope, $routeParams,  $location, recipesData, identity) {
        if (!identity.isAuthenticated()) {
            $location.path('/login');
            return;
        }

        $scope.isLogged = identity.isAuthenticated();

        // Filter
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
            isFirstDisabled: false,
            open: true
        };

        $scope.sort = function () {
            getRecipes();
        };

        // Carousel
        $scope.interval = 2500;
        $scope.recipesCarousel = [];

        recipesData.getAllRecipes(
            $scope.filter,
            function (data) {
                var index = Math.floor(Math.random() * (data.length - 4));
                console.log(index);
                $scope.recipesCarousel = data.slice(index, index + 3);
            });

        getRecipes();
    });
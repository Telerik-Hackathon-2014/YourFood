var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies',/* 'ui.bootstrap'*/]).value('toastr', toastr);

app.config(function($routeProvider, $locationProvider){
//    $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth){
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function (auth){
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'LoginCtrl'
        })
        .when('/products', {
            templateUrl: '/partials/products/products',
            controller: 'ProductsController'
        })
        .when('/recipes', {
            templateUrl: '/partials/recipes/recipes',
            controller: 'RecipesCtrl'
        })
        .when('/recipes/:id', {
            templateUrl: '/partials/recipes/recipe-info',
            controller: 'RecipeDetailsCtrl'
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .otherwise({redirectTo: '/'})
});

app.run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection){
        if (rejection === 'not authorized'){
            $location.path('/');
        }
    })
});
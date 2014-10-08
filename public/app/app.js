var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'ui.bootstrap']).value('toastr', toastr);

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
        .when('/products/:id', {
            templateUrl: '/partials/products/product-info',
            controller: 'ProductDetailsCtrl'
        })
        .when('/recipes', {
            templateUrl: '/partials/recipes/recipes',
            controller: 'RecipesCtrl'
        })
        .when('/recipes/:id', {
            templateUrl: '/partials/recipes/recipe-info',
            controller: 'RecipeDetailsCtrl'
        })
        .when('/shopping-list', {
            templateUrl: '/partials/list/shopping-list',
            controller: 'ShoppingListCtrl'
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
            templateUrl: '/partials/admin/users/users-list',
            controller: 'ListUsersController',
            resolve: routeUserChecks.adminRole
        })

        .when('/admin/products/categories', {
            templateUrl: '/partials/admin/products/product-categories-list',
            controller: 'ListProductCategoriesController',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/products/categories/create', {
            templateUrl: '/partials/admin/products/create-product-category',
            controller: 'CreateProductCategoryController',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/products/create', {
            templateUrl: '/partials/admin/products/create-catalog-product',
            controller: 'CreateCatalogProductController',
            resolve: routeUserChecks.adminRole
        })

        .when('/admin/recipes/categories', {
            templateUrl: '/partials/admin/recipes/recipe-categories-list',
            controller: 'ListRecipeCategoriesController',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/recipes/categories/create', {
            templateUrl: '/partials/admin/recipes/create-recipe-category',
            controller: 'CreateRecipeCategoryController',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/recipes/create', {
            templateUrl: '/partials/admin/recipes/create-recipe',
            controller: 'CreateRecipeController',
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
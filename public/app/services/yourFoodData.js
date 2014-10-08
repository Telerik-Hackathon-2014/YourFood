app.factory('YourFoodService', function ($q, $http) {
    'use strict';

    return {
        createCatalogProduct: function (catalogProduct) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/admin/catalog-products/',
                data: catalogProduct
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        createRecipe: function (recipe) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/admin/recipes/',
                data: recipe
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        createProductCategory: function (categoryModel) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/admin/categories/',
                data: categoryModel
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        createRecipeCategory: function (categoryModel) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/admin/recipe-categories/',
                data: categoryModel
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getProductCategoryNames: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/categories/'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getRecipeCategoryNames: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/recipe-categories/'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getUsers: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/admin/users'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }
});
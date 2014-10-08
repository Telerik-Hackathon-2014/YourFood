'use strict';

app.factory('productsData',
    function ($http, notifier) {
        var productsApi = 'api/catalog-products';

        return{
            getAllProducts: function (success) {
                $http.get(productsApi)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get catalog products');
                    });
            },
            getProductById: function (id, success) {
                $http.get(productsApi + '/' + id)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not get catalog product by id');
                    })
            }
        }
    });
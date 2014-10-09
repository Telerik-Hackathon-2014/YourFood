'use strict';

app.factory('productsData',
    function ($http, notifier) {
        var productsApi = 'api/catalog-products';

        return{
            getAllProducts: function (filter, success) {
                var url = productsApi + '?page=' + (filter.page -1);

                if (filter.category) {
                    url += '&orderByCategory=true';
                }

                if (filter.lifetime) {
                    url += '&orderByLifeTime=true';
                }

                if (filter.name) {
                    url += '&orderByName=true';
                }

                url += '&sortType=' + filter.sortType;

                $http.get(url)
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
            },
            addProductToFridge: function(id, product, success) {
                $http.post('api/products/add-to-fridge/' + id, product)
                    .success(function (data) {
                        success(data);
                    })
                    .error(function (err) {
                        notifier.error('Could not add product to fridge: ' + err);
                    })
            },
            getAvailableProducts: function() {
                $http.get()
            }
        }
    });
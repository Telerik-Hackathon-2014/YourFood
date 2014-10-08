app.controller('CreateCatalogProductController', function ($scope, $routeParams, $location, notifier, auth, YourFoodService, EverliveService) {
    var categories = {};

    YourFoodService.getProductCategoryNames()
        .then(function (collection) {
            collection.forEach(function (category) {
                categories[category.name] = category._id;
            });

            $scope.categories = categories;
        });

    $scope.createCatalogProduct = function (catalogProduct) {
        toggleLoading();
        var firstCommaIndex = catalogProduct.picture.indexOf(',');
        var imageData = catalogProduct.picture.substr(firstCommaIndex + 1);

        notifier.warning('Please wait while picture is uploading...');

        EverliveService.uploadImage(imageData, function (data) {
            onSuccessUpload(data, catalogProduct);
        }, onFailedUpload);
    };

    function toggleLoading() {
        $('#loadingmsg').toggle();
        $('#loadingover').toggle();
    }

    function onSuccessUpload(data, catalogProduct) {
        EverliveService.getImageData(data.result.Id)
            .then(function (data) {
                $.ajax({
                    type: "GET",
                    url: EverliveService.everlivePictureStorageUri + data.result[0].Url,
                    contentType: "application/json"
                }).then(function (imageData) {
                    notifier.success('Picture was uploaded successfully!');
                    addCatalogProductToDatabase(catalogProduct, imageData.Result.Uri);
                })
            }, onFailedUpload);
    }

    function onFailedUpload() {
        toggleLoading();
        notifier.error("Failed to create new catalog product!");
    }

    function addCatalogProductToDatabase(catalogProduct, imageUrl) {
        var catalogProductModel = {
            categoryName: catalogProduct.category,
            image: imageUrl,
            lifetime: catalogProduct.lifetime,
            name: catalogProduct.name,
            unit: catalogProduct.unit
        };

        YourFoodService.createCatalogProduct(catalogProductModel)
            .then(function (data) {
                toggleLoading();
                $location.path('/products');
            }, onFailedUpload);
    }
});
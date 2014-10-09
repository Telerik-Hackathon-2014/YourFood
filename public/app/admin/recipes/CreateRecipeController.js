app.controller('CreateRecipeController', function ($scope, $routeParams, $location, notifier, auth, YourFoodService, EverliveService, identity) {
    if(!identity.isAuthenticated()) {
        $location.path('/');
        return;
    }

    var categories = {};

    YourFoodService.getRecipeCategoryNames()
        .then(function (collection) {
            collection.forEach(function (category) {
                categories[category.name] = category._id;
            });

            $scope.categories = categories;
        });

    $scope.createRecipe = function (recipe) {
        toggleLoading();
        var firstCommaIndex = recipe.picture.indexOf(',');
        var imageData = recipe.picture.substr(firstCommaIndex + 1);

        notifier.warning('Please wait while picture is uploading...');

        EverliveService.uploadImage(imageData, function (data) {
            onSuccessUpload(data, recipe);
        }, onFailedUpload);
    };

    function toggleLoading() {
        $('#loadingmsg').toggle();
        $('#loadingover').toggle();
    }

    function onSuccessUpload(data, recipe) {
        EverliveService.getImageData(data.result.Id)
            .then(function (data) {
                $.ajax({
                    type: "GET",
                    url: EverliveService.everlivePictureStorageUri + data.result[0].Url,
                    contentType: "application/json"
                }).then(function (imageData) {
                    notifier.success('Picture was uploaded successfully!');
                    addRecipeToDatabase(recipe, imageData.Result.Uri);
                })
            }, onFailedUpload);
    }

    function onFailedUpload() {
        toggleLoading();
        notifier.error("Failed to create new recipe!");
    }

    function addRecipeToDatabase(recipe, imageUrl) {
        var recipeModel = {
            categoryName: recipe.category,
            image: imageUrl,
            description: recipe.description,
            name: recipe.name,
            time: recipe.time,
            products: [{
                name: 'asd'
            }]
        };

        YourFoodService.createRecipe(recipeModel)
            .then(function (data) {
                toggleLoading();
                $location.path('/recipes');
            }, onFailedUpload);
    }
});
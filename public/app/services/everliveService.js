app.factory('EverliveService', function (Utility) {
    var apiKey = '2yhIhGcbyj7m3MY8';
    var everlive = new Everlive(apiKey);
    var picturesCollection = "Pictures";

    return {
        everlivePictureStorageUri: "http://api.everlive.com/v1/" + apiKey + "/Files/",
        uploadImage: function (data, success, error) {
            return everlive.Files.create({
                    Filename: Utility.getRandomString() + ".jpg",
                    ContentType: "image/jpeg",
                    base64: data
                },
                function (picData) {
                    everlive.data(picturesCollection).create({
                        'Url': picData.result.Id
                    }, success, error);
                }, error);
        },
        getImageData: function (id) {
            return everlive.data(picturesCollection).get({ Id: id });
        }
    };
});


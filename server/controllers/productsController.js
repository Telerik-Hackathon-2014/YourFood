var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    User = mongoose.model('User'),
    CatalogProduct = mongoose.model('CatalogProduct');

module.exports = {
    createProduct: function (req, res, next) {
        console.log(req);
        var newProductData = req.body;

        Product.create(newProductData, function (err, product) {
            if (err) {
                console.log('Failed to create product: ' + err);
                return;
            }

            res.send(product);
            res.end();
        });
    },
    updateProduct: function (req, res) {
        var newProductData = req.body;

        if (req.body._id && Product.findOne({_id: req.body._id})) {
            Product.update({_id: req.body._id}, newProductData, function () {
                res.end();
            });
        }
    },
    getAllProducts: function (req, res) {
        Product.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Trying to get all products did not work out: ' + err);
            }

            res.send(collection);
        });
    },
    removeProduct: function (req, res) {

        Product.findById(req.body.id, function (err, product) {
            product.remove(function (err) {
                if (err) {
                    console.log('Product could not be removed: ' + err);
                }

                res.end();
            });
        });
    },
    getProductById: function(req, res) {
        var productId = req.body._id;

        Product.findOne({_id: productId}).exec(function (err, product) {
            if (err) {
                console.log('Trying to get product did not work out: ' + err);
                return;
            }

            res.send(product);
            res.end();
        });
    },
    addProductToFridge: function(req, res) {
        var catalogProductInfo = req.body;
        var userId = req.params.id;

        User.findById(userId, function(err, user) {
            if(err) {
                console.log('Could not find user: ' + err);
                return;
            }

            var productToAddInfo = {
                name: catalogProductInfo.name,
                image: catalogProductInfo.image,
                categoryName: catalogProductInfo.categoryName,
                categoryImage: catalogProductInfo.categoryImage,
                quantity: catalogProductInfo.quantity
            };

            Product.create(productToAddInfo, function(err, product) {
                if(err) {
                    console.log('Could not find catalog product: ' + err);
                    return;
                }

                user.availableProducts.push(product);
                user.save(function(err) {
                    console.log('Could not update user after entering product to fridge: ' + err);
                });

                res.send(product);
                res.end();
            });
        });
    }
};
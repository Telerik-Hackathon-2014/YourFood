var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    Product = mongoose.model('Product'),
    Category = mongoose.model('Category'),
    ShoppingList = mongoose.model('ShoppingList'),
    ShoppingListProduct = mongoose.model('ShoppingListProduct');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: String,
    salt: String,
    hashPass: String,
    roles: [String],
    shoppingList: mongoose.Schema.Types.ObjectId,
    availableProducts: [mongoose.Schema.Types.ObjectId],
    shoppingListsHistory: [mongoose.Schema.Types.ObjectId],
    productsHistory: [mongoose.Schema.Types.ObjectId]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            var salt,
                hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'yasen');
            User.create({username: 'yasen', firstName: 'Yasen', lastName: 'Mihaylov', email: 'yasen@yasen.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'zdravko');
            User.create({username: 'zdravko', firstName: 'Zdravko', lastName: 'Georgiev', email: 'zdravko@zdravko.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'stefan');
            User.create({username: 'stefan', firstName: 'Stefan', lastName: 'Dimov', email: 'stefan@stefan.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'niki');
            User.create({username: 'niki', firstName: 'Nikolay', lastName: 'Radkov', email: 'niki@niki.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'flextry');
            User.create({username: 'flextry', firstName: 'Martin', lastName: 'Nikolov', email: 'flextry@flextry.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            console.log('users added to database');

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'user');

            ShoppingList.create({
                products: [
                    new ShoppingListProduct({
                        name: 'Pasta',
                        categoryName: 'Breads',
                        categoryImage: 'images/product-category/wheat.jpg',
                        unit: 'gr',
                        quantity: 1000,
                        image: 'images/product/pasta.jpg'
                    }),
                    new ShoppingListProduct({
                        name: 'Broccoli',
                        categoryName: 'Vegetable',
                        categoryImage: 'images/product-category/vegetable.png',
                        unit: 'gr',
                        quantity: 500,
                        image: 'images/product/broccoli.png'
                    }),
                    new ShoppingListProduct({
                        name: 'Lemon',
                        categoryName: 'Fruit',
                        categoryImage: 'images/product-category/fruit.png',
                        unit: 'gr',
                        quantity: 400,
                        image: 'images/product/lemon.jpg'
                    })
                ],
                dateCreated: new Date()
            }, function(err, createdList) {
                if(err) {
                    console.log('Shopping list was not created: ' + err);
                }

                User.create({
                    username: 'user',
                    firstName: 'User',
                    lastName: 'Userov',
                    email: 'user@user.com',
                    salt: salt,
                    hashPass: hashedPwd,
                    roles: [],
                    shoppingList: createdList._id,
                    availableProducts: [],
                    shoppingListsHistory: [],
                    productsHistory: []
                });
            });


        }
    });
};


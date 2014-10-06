var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    ShoppingList = mongoose.model('ShoppingList'),
    ShoppingListSchema = mongoose.model('ShoppingList').schema,
    Product = mongoose.model('Product'),
    ProductSchema = mongoose.model('Product').schema,
    Category = mongoose.model('Category');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    firstName: { type: String, required: true, unique: true},
    lastName: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    address: String,
    salt: String,
    hashPass: String,
    roles: [String],
    availableProducts: [ProductSchema],
    shoppingListsHistory: [ShoppingListSchema],
    productsHistory: [ProductSchema]
});

userSchema.method({
    authenticate: function(password){
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass){
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function(err, collection){
        if (err){
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0 ){
            var salt,
                hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'yasen');
            User.create({username: 'yasen', firstName: 'Yasen', lastName: 'Mihaylov', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'zdravko');
            User.create({username: 'zdravko', firstName: 'Zdravko', lastName: 'Georgiev', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'stefan');
            User.create({username: 'stefan', firstName: 'Stefan', lastName: 'Dimov', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'niki');
            User.create({username: 'niki', firstName: 'Nikolay', lastName: 'Radkov', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'flextry');
            User.create({username: 'flextry', firstName: 'Martin', lastName: 'Nikolov', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            console.log('users added to database');


            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'user');

            User.create({
                username: 'user',
                firstName: 'User',
                lastName: 'Userov',
                email: 'user@user.com',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin'],
                availableProducts: [
                    new Product({
                        name: 'Banana',
                        category: new Category({name: 'Fruits'}),
                        quantity: 5,
                        expirationDate: new Date(),
                        purchaseDate: new Date()
                    }),
                    new Product({
                        name: 'Apple',
                        category: new Category({name: 'Fruits'}),
                        quantity: 7,
                        expirationDate: new Date(),
                        purchaseDate: new Date()
                    }),
                    new Product({
                        name: 'Passion Fruit',
                        category: new Category({name: 'Fruits'}),
                        quantity: 2,
                        expirationDate: new Date(),
                        purchaseDate: new Date()
                    }),
                    new Product({
                        name: 'Potato',
                        category: new Category({name: 'Vegetables'}),
                        quantity: 2,
                        expirationDate: new Date(),
                        purchaseDate: new Date()
                    })
                ],
                shoppingListsHistory: [],
                productsHistory: []
            });
        }
    });
};


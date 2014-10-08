var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    ShoppingList = mongoose.model('ShoppingList'),
    Product = mongoose.model('Product'),
    Category = mongoose.model('Category');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: String,
    salt: String,
    hashPass: String,
    roles: [String],
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
            User.create({username: 'yasen', firstName: 'Yasen', lastName: 'Mihaylov', email: 'user@user.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'zdravko');
            User.create({username: 'zdravko', firstName: 'Zdravko', lastName: 'Georgiev', email: 'user@user.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'stefan');
            User.create({username: 'stefan', firstName: 'Stefan', lastName: 'Dimov', email: 'user@user.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'niki');
            User.create({username: 'niki', firstName: 'Nikolay', lastName: 'Radkov', email: 'user@user.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'flextry');
            User.create({username: 'flextry', firstName: 'Martin', lastName: 'Nikolov', email: 'user@user.com', salt: salt, hashPass: hashedPwd, roles: ['admin']});
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
                roles: [],
                availableProducts: [],
                shoppingListsHistory: [],
                productsHistory: []
            });
        }
    });
};


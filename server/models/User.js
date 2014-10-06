var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    firstName: { type: String, required: true, unique: true},
    lastName: { type: String, required: true, unique: true},
    salt: String,
    hashPass: String,
    roles: [String]
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
            hashedPwd = encryption.generateHashedPassword(salt, 'martin');
            User.create({username: 'flextry', firstName: 'Martin', lastName: 'Nikolov', salt: salt, hashPass: hashedPwd, roles: ['admin']});
            console.log('users added to database');
        }
    });
};

var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        User.create(newUserData, function(err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                return;
            }

            req.login(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }

                res.send(user);
            })
        });
    },
    updateUserInformation: function(req, res, next){
        if (req.user._id == req.body._id){

            var updatedUserData = req.body;

            if (updatedUserData.password){
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                User.findOne({_id: req.body._id}).exec(function(err, user){
                    res.send(user);
                })
            })
        }
        else {
            res.send({reason: 'Because!!'});
        }
    },
    getAllUsers: function(req, res){
        User.find({}).exec(function(err,collection){
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    }
};
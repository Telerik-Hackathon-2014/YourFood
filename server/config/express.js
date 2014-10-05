var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config){
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret: 'something',
        saveUninitialized: true,
        resave: true
    }));
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function(str, path) {
                console.log(path);
                return stylus(str).set('filename', path);
            }
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
};
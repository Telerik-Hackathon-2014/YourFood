var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/yourfood',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin@ds039950.mongolab.com:39950/yourfood',
        port: process.env.PORT || 3030
    }
};
var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {

    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/products', auth.isAuthenticated, controllers.products.getAllProducts);
    app.post('/api/products', auth.isAuthenticated, controllers.products.createProduct);
    app.put('/api/products', auth.isAuthenticated, controllers.products.updateProduct);

    app.get('/api/catalog-products', auth.isAuthenticated, controllers.catalogProducts.getAllCatalogProducts);
    app.post('/api/catalog-products', auth.isAuthenticated, controllers.catalogProducts.createCatalogProduct);
    app.put('/api/catalog-products', auth.isAuthenticated, controllers.catalogProducts.updateCatalogProduct);

    app.get('/partials/:partialDir/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialDir + '/' + req.params.partialName);
    });

    app.post('/login', auth.login);

    app.post('/logout', auth.logout);


    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};
var usersController = require('../controllers/usersController'),
    productsController = require('../controllers/productsController'),
    catalogProductsController = require('../controllers/catalogProductsController');

module.exports = {
    users: usersController,
    products: productsController,
    catalogProducts: catalogProductsController
};
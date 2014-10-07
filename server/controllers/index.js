var usersController = require('../controllers/usersController'),
    productsController = require('../controllers/productsController'),
    catalogProductsController = require('../controllers/catalogProductsController'),
    recipesController = require('../controllers/recipesController');

module.exports = {
    users: usersController,
    products: productsController,
    catalogProducts: catalogProductsController,
    recipes: recipesController
};
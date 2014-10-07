var usersController = require('../controllers/usersController'),
    productsController = require('../controllers/productsController'),
    catalogProductsController = require('../controllers/catalogProductsController'),
    recipesController = require('../controllers/recipesController'),
    categoriesController = require('../controllers/categoriesController'),
    shoppingListController = require('../controllers/shoppingListController');

module.exports = {
    users: usersController,
    products: productsController,
    catalogProducts: catalogProductsController,
    recipes: recipesController,
    shoppingLists: shoppingListController,
    categories: categoriesController
};
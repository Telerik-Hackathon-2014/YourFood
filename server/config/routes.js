var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    // Admin rights
    app.get('/api/admin/users', auth.isInRole('admin'), controllers.users.getAllUsers);

    app.post('/api/admin/catalog-products', auth.isInRole('admin'), controllers.catalogProducts.createRecipe);
    app.put('/api/admin/catalog-products', auth.isInRole('admin'), controllers.catalogProducts.updateCatalogProduct);
    app.delete('/api/admin/catalog-products', auth.isInRole('admin'), controllers.catalogProducts.removeCatalogProduct);

    app.post('/api/admin/recipes', auth.isInRole('admin'), controllers.recipes.createRecipe);
    app.put('/api/admin/recipes', auth.isInRole('admin'), controllers.recipes.updateRecipe);
    app.delete('/api/admin/recipes', auth.isInRole('admin'), controllers.recipes.updateRecipe);

    app.post('/api/admin/categories', auth.isInRole('admin'), controllers.categories.createCategory);
    app.put('/api/admin/categories', auth.isInRole('admin'), controllers.categories.updateCategory);
    app.delete('/api/admin/categories', auth.isInRole('admin'), controllers.categories.removeCategory);

    app.post('/api/admin/recipe-categories', auth.isInRole('admin'), controllers.recipeCategories.createRecipeCategory);
    app.put('/api/admin/recipe-categories', auth.isInRole('admin'), controllers.recipeCategories.updateRecipeCategory);
    app.delete('/api/admin/recipe-categories', auth.isInRole('admin'), controllers.recipeCategories.removeRecipeCategory);

    // Users rights
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUserInformation);

    app.post('/api/products', auth.isAuthenticated, controllers.products.createProduct);
    app.put('/api/products', auth.isAuthenticated, controllers.products.updateProduct);
    app.delete('/api/products', auth.isAuthenticated, controllers.products.updateProduct);

    app.get('/api/catalog-products/:id', auth.isAuthenticated, controllers.catalogProducts.getCatalogProductById);

    app.get('/api/recipes/:id', auth.isAuthenticated, controllers.recipes.getRecipeById);

    app.get('/api/admin/recipe-categories/:id', auth.isAuthenticated, controllers.recipeCategories.getRecipeCategoryById);
    app.get('/api/recipe-categories', controllers.recipeCategories.getAllRecipeCategories);

    app.get('/api/shopping-list/:id', auth.isAuthenticated, controllers.shoppingLists.getShoppingList);
    app.post('/api/shopping-list/:id', auth.isAuthenticated, controllers.shoppingLists.addProductToShoppingList);
    app.get('/api/shopping-list/history/:id', auth.isAuthenticated, controllers.shoppingLists.getShoppingListsHistory);

    // Public rights
    app.get('/api/products', controllers.products.getAllProducts);

    app.get('/api/catalog-products', controllers.catalogProducts.getAllCatalogProducts);

    app.get('/api/recipes', controllers.recipes.getAllRecipes);

    app.get('/api/categories', controllers.categories.getAllCategories);

    // Standard routes
    app.get('/partials/admin/:partialDir/:partialName', function (req, res) {
        res.render('../../public/app/admin/' + req.params.partialDir + '/' + req.params.partialName);
    });

    // Standard routes
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
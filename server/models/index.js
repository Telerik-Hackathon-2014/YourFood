'use strict';

var Category = require('../models/Category'),
    RecipeCategory = require('../models/RecipeCategory'),
    CatalogProduct = require('../models/CatalogProduct'),
    Product = require('../models/Product'),
    ProductRecipe = require('../models/ProductRecipe'),
    ShoppingListProduct = require('../models/ShoppingListProduct'),
    ShoppingList = require('../models/ShoppingList'),
    Recipe = require('../models/Recipe'),
    User = require('../models/User');

module.exports = {
    user: User,
    catalogProduct: CatalogProduct,
    product: Product,
    shoppingList: ShoppingList,
    shoppingListProduct: ShoppingListProduct,
    recipe: Recipe,
    productRecipe: ProductRecipe,
    category: Category,
    recipeCategory: RecipeCategory
};
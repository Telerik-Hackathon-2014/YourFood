'use strict';

var Category = require('../models/Category'),
    RecipeCategory = require('../models/RecipeCategory'),
    Product = require('../models/Product'),
    ShoppingList = require('../models/ShoppingList'),
    ProductRecipe = require('../models/ProductRecipe'),
    Recipe = require('../models/Recipe'),
    User = require('../models/User');

module.exports = {
    user: User,
    product: Product,
    shoppingList: ShoppingList,
    recipe: Recipe,
    productRecipe: ProductRecipe,
    category: Category,
    recipeCategory: RecipeCategory
};
'use strict';

var mongoose = require('mongoose'),
    ProductRecipeSchema = mongoose.model('ProductRecipe').schema,
    ProductRecipe = mongoose.model('ProductRecipe'),
    RecipeCategory = mongoose.model('RecipeCategory');

var recipeSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    categoryName: { type: String },
    products: [ProductRecipeSchema],
    image: {type: String},
    time: {type:Number}
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.seedInitialRecipes = function () {
    Recipe.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }

        if (collection.length === 0) {
            Recipe.create({
                name: 'Blue cheese and broccoli pasta',
                description: 'Cook the pasta according to packet instructions. Place the broccoli in a steamer or in a saucepan of boiling water and cook until just tender, for approximately 5 minutes. Drain well then transfer to a food processor and blend to a bright green purée. Place the crème fraîche and cheese in a medium saucepan over a low heat and stir until the cheese has melted to form a smooth sauce. Stir in the lemon zest and juice, plenty of pepper and the nutmeg. Scrape the broccoli purée into the pan and stir well. Pour the sauce over the cooked pasta and sprinkle with the walnuts to serve. ',
                categoryName: 'Main dishes',
                products: [
                    new ProductRecipe({
                        name: 'Pasta',
                        quantity: 400
                    }),
                    new ProductRecipe({
                        name: 'Broccoli',
                        quantity: 250
                    }),
                    new ProductRecipe({
                        name: 'Cooking cream',
                        quantity: 200
                    }),
                    new ProductRecipe({
                        name: 'Blue cheese',
                        quantity: 200
                    }),
                    new ProductRecipe({
                        name: 'Lemon',
                        quantity: 200
                    }),
                    new ProductRecipe({
                        name: 'Walnut',
                        quantity: 30
                    })
                ],
                time: 25,
                image: 'images/recipe/blue-cheese-pasta.jpg'
            });

            Recipe.create({
                name: 'Homemade chicken noodle soup',
                description: 'Melt butter in a large soup pot over medium heat. Stir in carrot, onion, celery, salt, and fresh thyme. Stir in chicken fat; cook and stir until the onions turn soft and translucent, 5 to 6 minutes. Stir in roasted chicken broth and bring to a boil. Season to taste with salt, if necessary; stir in egg noodles and cook until tender, about 5 minutes. Stir in cooked chicken breast meat and simmer until heated through, about 5 minutes. Season with cayenne pepper, salt and black pepper to taste.',
                categoryName: 'Soup',
                products: [
                    new ProductRecipe({
                        name: 'Butter',
                        quantity: 5
                    }),
                    new ProductRecipe({
                        name: 'Carrot',
                        quantity: 300
                    }),
                    new ProductRecipe({
                        name: 'Onion',
                        quantity: 300
                    }),
                    new ProductRecipe({
                        name: 'Celery',
                        quantity: 300
                    }),
                    new ProductRecipe({
                        name: 'Salt',
                        quantity: 3
                    }),
                    new ProductRecipe({
                        name: 'Egg noodles',
                        quantity: 112
                    }),
                    new ProductRecipe({
                        name: 'Chicken breasts',
                        quantity: 500
                    }),
                    new ProductRecipe({
                        name: 'Black pepper',
                        quantity: 3
                    }),
                    new ProductRecipe({
                        name: 'Chicken broth',
                        quantity: 2000
                    })
                ],
                time: 40,
                image: 'images/recipe/homemade-chicken-soup.jpg'
            });

            Recipe.create({
                name: 'Homemade chicken noodle soup',
                description: 'Preheat oven to 175 degrees F (80 degrees C). Place a medium dish in the oven to warm. Heat a large skillet over medium-high heat. Brush chops lightly with oil and place in hot pan. Cook for 5 to 6 minutes, turning occasionally, or until done. Transfer to the warm dish, and keep warm in the preheated oven. In a small bowl, combine brown sugar, salt and pepper, cinnamon and nutmeg. Add butter to skillet, and stir in brown sugar mixture and apples. Cover and cook until apples are just tender. Remove apples with a slotted spoon and arrange on top of chops. Keep warm in the preheated oven. Continue cooking sauce uncovered in skillet, until thickened slightly. Spoon sauce over apples and chops. Sprinkle with pecans.',
                categoryName: 'Main dishes',
                products: [
                    new ProductRecipe({
                        name: 'Pork',
                        quantity: 1000
                    }),
                    new ProductRecipe({
                        name: 'Vegetable oil',
                        quantity: 3
                    }),
                    new ProductRecipe({
                        name: 'Brown sugar',
                        quantity: 15
                    }),
                    new ProductRecipe({
                        name: 'Salt',
                        quantity: 3
                    }),
                    new ProductRecipe({
                        name: 'Pepper',
                        quantity: 3
                    }),
                    new ProductRecipe({
                        name: 'Cinnamon',
                        quantity: 0.5
                    }),
                    new ProductRecipe({
                        name: 'Nutmeg',
                        quantity: 0.5
                    }),
                    new ProductRecipe({
                        name: 'Butter',
                        quantity: 50
                    }),
                    new ProductRecipe({
                        name: 'Apples',
                        quantity: 350
                    })
                ],
                time: 45,
                image: 'images/recipe/pork-chops-with-apples.jpg'
            });

            Recipe.create({
                name: 'Mouth-watering stuffed mushrooms',
                description: 'Preheat oven to 350 degrees F (175 degrees C). Spray a baking sheet with cooking spray. Clean mushrooms with a damp paper towel. Carefully break off stems. Chop stems extremely fine, discarding tough end of stems. Heat oil in a large skillet over medium heat. Add garlic and chopped mushroom stems to the skillet. Fry until any moisture has disappeared, taking care not to burn garlic. Set aside to cool. When garlic and mushroom mixture is no longer hot, stir in cream cheese, Parmesan cheese, black pepper, onion powder and cayenne pepper. Mixture should be very thick. Using a little spoon, fill each mushroom cap with a generous amount of stuffing. Arrange the mushroom caps on prepared cookie sheet. Bake for 20 minutes in the preheated oven, or until the mushrooms are piping hot and liquid starts to form under caps.',
                categoryName: 'Appetizers',
                products: [
                    new ProductRecipe({
                        name: 'Mushrooms',
                        quantity: 500
                    }),
                    new ProductRecipe({
                        name: 'Vegetable oil',
                        quantity: 5
                    }),
                    new ProductRecipe({
                        name: 'Garlic',
                        quantity: 10
                    }),
                    new ProductRecipe({
                        name: 'Cream cheese',
                        quantity: 225
                    }),
                    new ProductRecipe({
                        name: 'Parmesan',
                        quantity: 75
                    }),
                    new ProductRecipe({
                        name: 'Black pepper',
                        quantity: 2
                    }),
                    new ProductRecipe({
                        name: 'Red pepper',
                        quantity: 2
                    }),
                    new ProductRecipe({
                        name: 'Onion powder',
                        quantity: 2
                    })
                ],
                time: 45,
                image: 'images/recipe/mouth-watering-stuffed-mushrooms.jpg'
            });

            Recipe.create({
                name: 'King crab appetizers',
                description: 'Preheat oven to 375 degrees F (190 degrees C). Lightly grease 12 tartlet pans. Divide rolls in half and press into the prepared tartlet pans. Set aside. In a large bowl, combine cream cheese, crab, mayonnaise, Parmesan cheese, Cheddar cheese, green onions and Worcestershire sauce. Spoon 1 teaspoon of mixture into tarts and garnish with paprika. Bake at 375 degrees F (190 degrees C) for 15 to 20 minutes, or until light brown. These freeze wonderfully. Just reheat before serving.',
                categoryName: 'Appetizers',
                products: [
                    new ProductRecipe({
                        name: 'Biscuit dough',
                        quantity: 340
                    }),
                    new ProductRecipe({
                        name: 'Crab meat',
                        quantity: 175
                    }),
                    new ProductRecipe({
                        name: 'Mayonnaise',
                        quantity: 40
                    }),
                    new ProductRecipe({
                        name: 'Cream cheese',
                        quantity: 225
                    }),
                    new ProductRecipe({
                        name: 'Parmesan',
                        quantity: 30
                    }),
                    new ProductRecipe({
                        name: 'Worcestershire sauce',
                        quantity: 3
                    }),
                    new ProductRecipe({
                        name: 'Red pepper',
                        quantity: 2
                    }),
                    new ProductRecipe({
                        name: 'Green onion',
                        quantity: 30
                    })
                ],
                time: 30,
                image: 'images/recipe/king-crab-appetizers.jpg'
            });

            Recipe.create({
                name: 'Fluffy Strawberry Pie',
                description: 'Mix strawberry-flavored gelatin mix, sugar, and boiling water together in a large bowl, stirring until gelatin and sugar have dissolved. Refrigerate gelatin mixture until it begins to turn thick and syrupy, about 10 minutes. Gently fold frozen whipped topping into the gelatin mixture until thoroughly combined. Fold the 2 1/2 cups of sliced strawberries into the whipped topping mixture. Spoon filling into the graham cracker crust and decorate edge of filling with 8 strawberry halves. Refrigerate at least 2 hours before serving.',
                categoryName: 'Dessert',
                products: [
                    new ProductRecipe({
                        name: 'Strawberry Jell-O',
                        quantity: 80
                    }),
                    new ProductRecipe({
                        name: 'Sugar',
                        quantity: 100
                    }),
                    new ProductRecipe({
                        name: 'Water',
                        quantity: 200
                    }),
                    new ProductRecipe({
                        name: 'Whip cream',
                        quantity: 225
                    }),
                    new ProductRecipe({
                        name: 'Strawberries',
                        quantity: 1000
                    }),
                    new ProductRecipe({
                        name: 'Graham cracker crust',
                        quantity: 400
                    })
                ],
                time: 150,
                image: 'images/recipe/fluffy-strawberry-pie.jpg'
            });

            Recipe.create({
                name: 'Apple and Pomegranate Crisp',
                description: 'Preheat the oven to 375 degrees F (190 degrees C). Butter a 9x13-inch baking dish. In a large bowl, toss together the apples, pomegranate seeds, brown sugar, cinnamon, and nutmeg. Spread evenly into the prepared pan. In the same bowl, stir together the oats, flour and sugar. Rub in the butter between your fingers until the mixture resembles coarse crumbs. Sprinkle over the top of the fruit. Bake for 45 minutes in the preheated oven, or until the apples are soft. Let stand 10 minutes before serving. Serve warm or at room temperature.',
                categoryName: 'Dessert',
                products: [
                    new ProductRecipe({
                        name: 'Apples',
                        quantity: 600
                    }),
                    new ProductRecipe({
                        name: 'Pomegranate',
                        quantity: 175
                    }),
                    new ProductRecipe({
                        name: 'Brown sugar',
                        quantity: 150
                    }),
                    new ProductRecipe({
                        name: 'Cinnamon',
                        quantity: 7
                    }),
                    new ProductRecipe({
                        name: 'Nutmeg',
                        quantity: 2
                    }),
                    new ProductRecipe({
                        name: 'Rolled oats',
                        quantity: 150
                    }),
                    new ProductRecipe({
                        name: 'Flour',
                        quantity: 150
                    }),
                    new ProductRecipe({
                        name: 'Sugar',
                        quantity: 150
                    }),
                    new ProductRecipe({
                        name: 'Butter',
                        quantity: 150
                    })
                ],
                time: 70,
                image: 'images/recipe/apple-and-pomegranate-crisp.jpg'
            });

            Recipe.create({
                name: 'Chocolate chip cookies',
                description: 'Preheat the oven to 375 degrees F (190 degrees C). Butter a 9x13-inch baking dish. In a large bowl, toss together the apples, pomegranate seeds, brown sugar, cinnamon, and nutmeg. Spread evenly into the prepared pan. In the same bowl, stir together the oats, flour and sugar. Rub in the butter between your fingers until the mixture resembles coarse crumbs. Sprinkle over the top of the fruit. Bake for 45 minutes in the preheated oven, or until the apples are soft. Let stand 10 minutes before serving. Serve warm or at room temperature.',
                categoryName: 'Dessert',
                products: [
                    new ProductRecipe({
                        name: 'Flour',
                        quantity: 1350
                    }),
                    new ProductRecipe({
                        name: 'Baking soda',
                        quantity: 8
                    }),
                    new ProductRecipe({
                        name: 'Butter',
                        quantity: 400
                    }),
                    new ProductRecipe({
                        name: 'Brown sugar',
                        quantity: 450
                    }),
                    new ProductRecipe({
                        name: 'Sugar',
                        quantity: 150
                    }),
                    new ProductRecipe({
                        name: 'Vanilla pudding mix',
                        quantity: 90
                    }),
                    new ProductRecipe({
                        name: 'Vanilla extract',
                        quantity: 30
                    }),
                    new ProductRecipe({
                        name: 'Chocolate chips',
                        quantity: 600
                    })
                ],
                time: 70,
                image: 'images/recipe/chocolate-chip-cookies.jpg'
            });

            console.log('Recipes added....');
        }
    });
};

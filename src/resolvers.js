import { findItemsInArrayWithGivenPropValues } from './common.js';

const resolvers = {
    Query: {
      recipes: async (_, args, { dataSources }) => {
        let recipes = [];
        try {
          if (args.searchString) {
            recipes = await dataSources.recipesAPI.getAllRecipesWith(args.searchString);
          } else {
            recipes = await dataSources.getAllRecipes();
          }
        }
        catch (err) {
          console.log(err);
        }
        const { itemTypes, mealTypes, serving, cuisines, dishCategories, userIds, ingredients } = args;
        const propNameToFilterMap = new Map([['itemType', itemTypes], ['mealTypes', mealTypes],
          ['cuisines', cuisines], ['dishCategories', dishCategories], ['user.id', userIds], ['recipeIngredients.ingredient.name', ingredients]]);

        const resArrayOfAllFilters = [];
        propNameToFilterMap.forEach((value, key) => {
          resArrayOfAllFilters.push(findItemsInArrayWithGivenPropValues(key, value, recipes));
        });
        const recipesWithServing = serving ? recipes.filter((recipe) => recipe.serving === serving) : recipes;
        resArrayOfAllFilters.push(recipesWithServing);
        return resArrayOfAllFilters.reduce((prevResArray, currentArray) => {
          return prevResArray.filter((element) => currentArray.includes(element));
        });
      },  
    },
  };

  export default resolvers;
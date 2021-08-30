import meals from '../../../cypress/mocks/meals';
import areas from '../../../cypress/mocks/areas';
import soupMeals from '../../../cypress/mocks/soupMeals';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import drinkCategories from '../../../cypress/mocks/drinkCategories';
import drinksByIngredient from '../../../cypress/mocks/drinksByIngredient';
import oneDrink from '../../../cypress/mocks/oneDrink';
import emptyMeals from '../../../cypress/mocks/emptyMeals';
import drinks from '../../../cypress/mocks/drinks';
import japaneseMeals from '../../../cypress/mocks/japaneseMeals';
import mealCategories from '../../../cypress/mocks/mealCategories';

const mockFetch = async (url) => ({
  json: async () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list') {
      return areas;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return mealCategories;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return meals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') {
      return soupMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') {
      return mealsByIngredient;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') {
      return emptyMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese') {
      return japaneseMeals;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return drinkCategories;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') {
      return drinksByIngredient;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
      return oneDrink;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return drinks;
    }
  },
});

export default mockFetch;

// export const mockDrinkFetch = async (url) => ({
//   json: async () => {
//     if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
//       return drinkCategories;
//     }
//     if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') {
//       return drinksByIngredient;
//     }
//     if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
//       || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
//       || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
//       return oneDrink;
//     }
//     if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
//       return drinks;
//     }
//   },
// });

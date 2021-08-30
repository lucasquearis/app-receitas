import meals from '../../../cypress/mocks/meals';
import areas from '../../../cypress/mocks/areas';
import soupMeals from '../../../cypress/mocks/soupMeals';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import drinkCategories from '../../../cypress/mocks/drinkCategories';
import drinksByIngredient from '../../../cypress/mocks/drinksByIngredient';
import oneDrink from '../../../cypress/mocks/oneDrink';
import emptyMeals from '../../../cypress/mocks/emptyMeals';

export const mockFoodFetch = async (url) => ({
  json: async () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return areas;
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
  },
});

export const mockDrinkFetch = async (url) => ({
  json: async () => {
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return drinkCategories;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') {
      return drinksByIngredient;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine') {
      return oneDrink;
    }
  },
});

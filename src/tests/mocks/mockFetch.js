import meals from '../../../cypress/mocks/meals';
import areas from '../../../cypress/mocks/areas';
import emptyMeals from '../../../cypress/mocks/emptyMeals';
import japaneseMeals from '../../../cypress/mocks/japaneseMeals';
import mealCategories from '../../../cypress/mocks/mealCategories';
import mealIngredients from '../../../cypress/mocks/mealIngredients';
import drinkIngredients from '../../../cypress/mocks/drinkIngredients';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import drinksByIngredient from '../../../cypress/mocks/drinksByIngredient';

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
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') {
      return emptyMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese') {
      return japaneseMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') {
      return mealIngredients;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') {
      return drinkIngredients;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') {
      return mealsByIngredient;
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') {
      return drinksByIngredient;
    }
  },
});

export default mockFetch;

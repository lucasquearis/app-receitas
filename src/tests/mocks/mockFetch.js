import meals from '../../../cypress/mocks/meals';
import areas from '../../../cypress/mocks/areas';
import emptyMeals from '../../../cypress/mocks/emptyMeals';
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
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') {
      return emptyMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese') {
      return japaneseMeals;
    }
  },
});

export default mockFetch;

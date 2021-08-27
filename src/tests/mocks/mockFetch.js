import meals from '../../../cypress/mocks/meals';
import areas from '../../../cypress/mocks/areas';
import drinks from '../../../cypress/mocks/drinks';

export const mockFoodFetch = async (url) => ({
  json: async () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return areas;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return meals;
    }
  },
});

export const mockDrinkFetch = async (url) => ({
  json: async () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return areas;
    }
    return drinks;
  },
});

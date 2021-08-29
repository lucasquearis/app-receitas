import oneDrink from '../../../cypress/mocks/oneDrink';
import { soupMeals, oneMeal, ginDrinks } from './respMoks';

const fetchMock = async (url) => ({
  status: 200,
  ok: true,
  json: async () => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Soup':
      return soupMeals;

    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata':
      return oneMeal;

    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine':
      return oneDrink;

    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin':
      return ginDrinks;

    default: return { erro: 'url invalida' };
    }
  },
});

export default fetchMock;

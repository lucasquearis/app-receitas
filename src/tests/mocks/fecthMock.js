// import soup from './soup.json';
import soupMeals from '../../../cypress/mocks/soupMeals';

const fetchMock = (url) => Promise.resolve(() => ({
  status: 200,
  ok: true,
  json: () => Promise.resolve(() => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Soup':
      return soupMeals;
    default: return { erro: 'url invalida' };
    }
  }),
}));

export default fetchMock;

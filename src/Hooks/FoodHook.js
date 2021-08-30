import { useHistory } from 'react-router-dom';
import recipesHooks from './recipesHooks';

const Food = () => {
  const { searchRecipes } = recipesHooks;

  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');
  const url = currentRout ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const searchInput = {
    type: 'all',
    input: '',
  };

  const getRecipes = () => searchRecipes(searchInput, currentRout, url, history);

  return {
    getRecipes,
  };
};

export default Food;

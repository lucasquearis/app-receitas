import { GET_RECIPES } from '../types';

const getRecipes = (recipes) => ({
  type: GET_RECIPES,
  payload: { recipes },
});

export default getRecipes;

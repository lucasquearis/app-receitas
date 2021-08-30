import {
  fetchCategoriesForDrinksApi,
  fetchCategoriesForFoodsApi,
} from '../../services/fetchApi';
import isFetching from './isFetching';
import getRecipes from './getRecipes';
import fetchError from './fetchError';

export default function fetchRecipesForCategory(category, foodPage) {
  return async (dispatch) => {
    dispatch(isFetching());
    try {
      if (foodPage) {
        const recipes = await fetchCategoriesForFoodsApi(category);
        dispatch(getRecipes(recipes));
        return;
      }
      const recipes = await fetchCategoriesForDrinksApi(category);
      dispatch(getRecipes(recipes));
    } catch (error) {
      fetchError();
      console.log(error);
    }
  };
}

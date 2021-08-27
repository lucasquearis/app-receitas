import {
  fetchCategoriesForDrinksApi,
  fetchCategoriesForFoodsApi,
} from '../../services/fetchApi';
import isFetching from './isFetching';
import fetchSuccess from './fetchSuccess';
import getRecipes from './getRecipes';
import fetchError from './fetchError';

export default function fetchRecipesForCategory(category, foodPage) {
  return async (dispatch) => {
    dispatch(isFetching());
    try {
      if (foodPage) {
        const recipes = await fetchCategoriesForFoodsApi(category);
        dispatch(fetchSuccess());
        return dispatch(getRecipes(recipes));
      }
      const recipes = await fetchCategoriesForDrinksApi(category);
      dispatch(fetchSuccess());
      return dispatch(getRecipes(recipes));
    } catch (error) {
      fetchError();
      console.log(error);
    }
  };
}

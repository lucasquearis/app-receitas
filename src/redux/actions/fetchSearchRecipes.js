import { fetchSearchFoodsApi, fetchSearchDrinksApi } from '../../services/fetchApi';
import isFetching from './isFetching';
import fetchSuccess from './fetchSuccess';
import getRecipes from './getRecipes';
import fetchError from './fetchError';

export default function fetchSearchRecipes({ query, consultBy, foodPage }) {
  return async (dispatch) => {
    dispatch(isFetching());
    try {
      if (foodPage) {
        const recipes = await fetchSearchFoodsApi(consultBy, query);
        dispatch(fetchSuccess());
        return dispatch(getRecipes(recipes));
      }
      const recipes = await fetchSearchDrinksApi(consultBy, query);
      dispatch(fetchSuccess());
      return dispatch(getRecipes(recipes));
    } catch (error) {
      fetchError();
    }
  };
}

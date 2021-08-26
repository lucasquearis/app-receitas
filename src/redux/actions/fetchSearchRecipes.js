import { fetchSearchFoodsApi, fetchSearchDrinksApi } from '../../services/fetchApi';
import isFetching from './isFetching';
import fetchSuccess from './fetchSuccess';
import getRecipes from './getRecipes';
import fetchError from './fetchError';

const MSG_ALERT = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export default function fetchSearchRecipes({ query, consultBy, foodPage }) {
  return async (dispatch) => {
    dispatch(isFetching());
    try {
      if (foodPage) {
        const recipes = await fetchSearchFoodsApi(consultBy, query);
        dispatch(fetchSuccess());
        const { alert } = window;
        if (!recipes.length) alert(MSG_ALERT);
        return dispatch(getRecipes(recipes));
      }
      const recipes = await fetchSearchDrinksApi(consultBy, query);
      dispatch(fetchSuccess());
      const { alert } = window;
      if (!recipes.length) alert(MSG_ALERT);
      return dispatch(getRecipes(recipes));
    } catch (error) {
      fetchError();
    }
  };
}

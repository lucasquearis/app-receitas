import {
  SEARCH_NOME_MEALS,
  SEARCH_NOME_MEALS_SUCCESS,
  SEARCH_NOME_MEALS_ERROR,
} from './actionTypes';

const getSearch = () => ({
  type: SEARCH_NOME_MEALS,
});

const getSearchSuccess = (search) => ({
  type: SEARCH_NOME_MEALS_SUCCESS,
  payload: search,
});

const getSearchError = (error) => ({
  type: SEARCH_NOME_MEALS_ERROR,
  payload: error,
});

const fetchSearchNomeMeal = (text) => async (dispatch) => {
  dispatch(getSearch());
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
  const json = await response.json();
  try {
    dispatch(getSearchSuccess(json.meals));
  } catch (error) {
    dispatch(getSearchError(error));
  }
};

export default fetchSearchNomeMeal;

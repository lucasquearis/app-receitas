import {
  SEARCH_NOME_DRINKS,
  SEARCH_NOME_DRINKS_SUCCESS,
  SEARCH_NOME_DRINKS_ERROR,
} from './actionTypes';

const getSearch = () => ({
  type: SEARCH_NOME_DRINKS,
});

const getSearchSuccess = (search) => ({
  type: SEARCH_NOME_DRINKS_SUCCESS,
  payload: search,
});

const getSearchError = (error) => ({
  type: SEARCH_NOME_DRINKS_ERROR,
  payload: error,
});

const fetchSearchNomeDrinks = (text) => async (dispatch) => {
  dispatch(getSearch());
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`);
  const json = await response.json();
  try {
    dispatch(getSearchSuccess(json.drinks));
  } catch (error) {
    dispatch(getSearchError(error));
  }
};

export default fetchSearchNomeDrinks;

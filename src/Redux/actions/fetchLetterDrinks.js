import {
  SEARCH_LETTER_DRINKS,
  SEARCH_LETTER_DRINKS_SUCCESS,
  SEARCH_LETTER_DRINKS_ERROR,
} from './actionTypes';

const getSearch = () => ({
  type: SEARCH_LETTER_DRINKS,
});

const getSearchSuccess = (search) => ({
  type: SEARCH_LETTER_DRINKS_SUCCESS,
  payload: search,
});

const getSearchError = (error) => ({
  type: SEARCH_LETTER_DRINKS_ERROR,
  payload: error,
});

const fetchSearchLetterDrinks = (text) => async (dispatch) => {
  dispatch(getSearch());
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`);
  const json = await response.json();
  if (json.drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    try {
      dispatch(getSearchSuccess(json.drinks));
    } catch (error) {
      dispatch(getSearchError(error));
    }
  }
};

export default fetchSearchLetterDrinks;

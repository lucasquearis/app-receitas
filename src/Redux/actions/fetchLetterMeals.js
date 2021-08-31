import {
  SEARCH_LETTER_MEALS,
  SEARCH_LETTER_MEALS_SUCCESS,
  SEARCH_LETTER_MEALS_ERROR,
} from './actionTypes';

const getSearch = () => ({
  type: SEARCH_LETTER_MEALS,
});

const getSearchSuccess = (search) => ({
  type: SEARCH_LETTER_MEALS_SUCCESS,
  payload: search,
});

const getSearchError = (error) => ({
  type: SEARCH_LETTER_MEALS_ERROR,
  payload: error,
});

const fetchSearchLetterMeal = (text) => async (dispatch) => {
  dispatch(getSearch());
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`);
  const json = await response.json();
  if (json.meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    try {
      dispatch(getSearchSuccess(json.meals));
    } catch (error) {
      dispatch(getSearchError(error));
    }
  }
};

export default fetchSearchLetterMeal;

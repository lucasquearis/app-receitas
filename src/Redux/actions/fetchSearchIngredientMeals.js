import {
  SEARCH_INGREDIENT_MEALS,
  SEARCH_INGREDIENT_MEALS_SUCCESS,
  SEARCH_INGREDIENT_MEALS_ERROR,
} from './actionTypes';

const getSearch = () => ({
  type: SEARCH_INGREDIENT_MEALS,
});

const getSearchSuccess = (search) => ({
  type: SEARCH_INGREDIENT_MEALS_SUCCESS,
  payload: search,
});

const getSearchError = (error) => ({
  type: SEARCH_INGREDIENT_MEALS_ERROR,
  payload: error,
});

const fetchSearchIngredientMeal = (text) => async (dispatch) => {
  dispatch(getSearch());
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
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

export default fetchSearchIngredientMeal;

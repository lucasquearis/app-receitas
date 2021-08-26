import {
  DRINKS_FILTERED_CATEGORY,
  DRINKS_FILTERED_CATEGORY_SUCCESS,
  DRINKS_FILTERED_CATEGORY_ERROR,
} from './actionTypes';

const getDrinksFilteredByCategory = () => ({
  type: DRINKS_FILTERED_CATEGORY,
});

const getDrinksFilteredByCategorySuccess = (DRINKS) => ({
  type: DRINKS_FILTERED_CATEGORY_SUCCESS,
  payload: DRINKS,
});

const getDrinksFilteredByCategoryError = (error) => ({
  type: DRINKS_FILTERED_CATEGORY_ERROR,
  payload: error,
});

const fetchDrinksByCategory = (category) => async (dispatch) => {
  dispatch(getDrinksFilteredByCategory());
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const json = await response.json();

  try {
    dispatch(getDrinksFilteredByCategorySuccess(json.drinks));
  } catch (error) {
    dispatch(getDrinksFilteredByCategoryError(error));
  }
};

export default fetchDrinksByCategory;

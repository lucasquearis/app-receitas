import {
  MEALS_FILTERED_CATEGORY,
  MEALS_FILTERED_CATEGORY_SUCCESS,
  MEALS_FILTERED_CATEGORY_ERROR,
} from './actionTypes';

const getMealsFilteredByCategory = () => ({
  type: MEALS_FILTERED_CATEGORY,
});

const getMealsFilteredByCategorySuccess = (meals) => ({
  type: MEALS_FILTERED_CATEGORY_SUCCESS,
  payload: meals,
});

const getMealsFilteredByCategoryError = (error) => ({
  type: MEALS_FILTERED_CATEGORY_ERROR,
  payload: error,
});

const fetchMealsByCategory = (category) => async (dispatch) => {
  dispatch(getMealsFilteredByCategory());
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(endpoint);
  const json = await response.json();

  try {
    dispatch(getMealsFilteredByCategorySuccess(json.meals));
  } catch (error) {
    dispatch(getMealsFilteredByCategoryError(error));
  }
};

export default fetchMealsByCategory;

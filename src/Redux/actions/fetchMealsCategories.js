import {
  MEALS_CATEGORIES,
  MEALS_CATEGORIES_SUCCESS,
  MEALS_CATEGORIES_ERROR,
} from './actionTypes';

const getMealsCategories = () => ({
  type: MEALS_CATEGORIES,
});

const getMealsCategoriesSuccess = (mealsCategories) => ({
  type: MEALS_CATEGORIES_SUCCESS,
  payload: mealsCategories,
});

const getMealsCategoriesError = (error) => ({
  type: MEALS_CATEGORIES_ERROR,
  payload: error,
});

const fetchMealsCategories = () => async (dispatch) => {
  dispatch(getMealsCategories());
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const json = await response.json();
  try {
    dispatch(getMealsCategoriesSuccess(json.meals));
  } catch (error) {
    dispatch(getMealsCategoriesError(error));
  }
};

export default fetchMealsCategories;

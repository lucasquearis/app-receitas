import {
  MEAL_CATEGORIE,
  MEAL_CATEGORIE_SUCCESS,
  MEAL_CATEGORIE_ERROR,
} from './actionTypes';

const getCategories = () => ({
  type: MEAL_CATEGORIE,
});

const getCategoriesSuccess = (meals) => ({
  type: MEAL_CATEGORIE_SUCCESS,
  payload: meals,
});

const getCategoriesError = (error) => ({
  type: MEAL_CATEGORIE_ERROR,
  payload: error,
});

const fetchCategories = () => async (dispatch) => {
  dispatch(getCategories());
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const json = await response.json();
  try {
    dispatch(getCategoriesSuccess(json.meals));
  } catch (error) {
    dispatch(getCategoriesError(error));
  }
};

export default fetchCategories;

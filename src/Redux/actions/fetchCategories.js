import {
  MEAL_CATEGORIE,
  MEAL_CATEGORIE_SUCCESS,
  MEAL_CATEGORIE_ERROR,
} from './actionTypes';

const getMeals = () => ({
  type: MEAL_CATEGORIE,
});

const getMealsSuccess = (responseMeals) => ({
  type: MEAL_CATEGORIE_SUCCESS,
  payload: responseMeals,
});

const getMealsError = (error) => ({
  type: MEAL_CATEGORIE_ERROR,
  payload: error,
});

export const fetchMealsCategories = () => async (dispatch) => {
  dispatch(getMeals());
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const json = await response.json();
  try {
    dispatch(getMealsSuccess(json.meals));
    // a chave meals é um array de objetos podendo assim usarmos o spreed operator la no reducer
  } catch (error) {
    dispatch(getMealsError(error));
  }
};

export default fetchMealsCategories;

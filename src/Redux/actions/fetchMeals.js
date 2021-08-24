import {
  MEAL,
  MEAL_SUCCESS,
  MEAL_ERROR,
} from './actionTypes';

const getMeal = () => ({
  type: MEAL,
});

const getMealSuccess = (meal) => ({
  type: MEAL_SUCCESS,
  payload: meal,
});

const getMealError = (error) => ({
  type: MEAL_ERROR,
  payload: error,
});

const fetchMeals = () => async (dispatch) => {
  dispatch(getMeal());
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endPoint);
  const json = await response.json();

  try {
    dispatch(getMealSuccess(json.meals));
  } catch (error) {
    dispatch(getMealError(error));
  }
};

export default fetchMeals;

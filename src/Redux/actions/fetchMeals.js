import {
  MEALS,
  MEALS_SUCCESS,
  MEALS_ERROR,
} from './actionTypes';

const getMeals = () => ({
  type: MEALS,
});

const getMealsSuccess = (meal) => ({
  type: MEALS_SUCCESS,
  payload: meal,
});

const getMealsError = (error) => ({
  type: MEALS_ERROR,
  payload: error,
});

export const fetchMeals = () => async (dispatch) => {
  dispatch(getMeals());
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endPoint);
  const json = await response.json();

  try {
    dispatch(getMealsSuccess(json.meals));
  } catch (error) {
    dispatch(getMealsError(error));
  }
};

export const fetchMealsByName = (text) => async (dispatch) => {
  dispatch(getMeals());
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
  const response = await fetch(endPoint);
  const json = await response.json();
  if (json.meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    try {
      dispatch(getMealsSuccess(json.meals));
    } catch (error) {
      dispatch(getMealsError(error));
    }
  }
};

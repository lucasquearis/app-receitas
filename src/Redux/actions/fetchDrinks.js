import {
  DRINKS,
  DRINKS_SUCCESS,
  DRINKS_ERROR,
} from './actionTypes';

const getDrinks = () => ({
  type: DRINKS,
});

const getDrinksSuccess = (meal) => ({
  type: DRINKS_SUCCESS,
  payload: meal,
});

const getDrinksError = (error) => ({
  type: DRINKS_ERROR,
  payload: error,
});

export const fetchDrinks = () => async (dispatch) => {
  dispatch(getDrinks());
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endPoint);
  const json = await response.json();

  try {
    dispatch(getDrinksSuccess(json.drinks));
  } catch (error) {
    dispatch(getDrinksError(error));
  }
};

export const fetchDrinksByName = (text) => async (dispatch) => {
  dispatch(getDrinks());
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`;
  const response = await fetch(endPoint);
  const json = await response.json();
  if (json.drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    try {
      dispatch(getDrinksSuccess(json.drinks));
    } catch (error) {
      dispatch(getDrinksError(error));
    }
  }
};

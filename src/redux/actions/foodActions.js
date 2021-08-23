import { fetchFoods, fetchDrinks } from '../../services';
import { ADD_FOODS, ADD_DRINKS } from './actionTypes';

export const addFoods = (payload) => ({
  type: ADD_FOODS,
  payload,
});

const addDrinks = (payload) => ({
  type: ADD_DRINKS,
  payload,
});

export const fetchFoodRedux = async (dispatch) => {
  const results = await fetchFoods();
  dispatch(addFoods(results));
};

export const fetchDrinksRedux = async (dispatch) => {
  const results = await fetchDrinks();
  dispatch(addDrinks(results));
};

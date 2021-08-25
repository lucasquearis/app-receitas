import * as types from './actionTypes';
import fetchFoodAPI from '../../API/fetchFoodAPI';
import fetchDrinksAPI from '../../API/fetchDrinksAPI';

// Action Creators - Login Actions

export const loginAction = (payload) => ({
  type: types.LOGIN,
  payload,
});

// Action Creators - SearchBar Actions

export const ingredientRequest = () => ({
  type: types.INGREDIENT_REQUEST,
});

export const letterRequest = () => ({
  type: types.LETTER_REQUEST,
});

export const nameRequest = () => ({
  type: types.NAME_REQUEST,
});

export const ingredientRequestSuccess = (payload) => ({
  type: types.INGREDIENT_REQUEST_SUCCESS,
  payload,
});

export const letterRequestSuccess = (payload) => ({
  type: types.LETTER_REQUEST_SUCCESS,
  payload,
});

export const nameRequestSuccess = (payload) => ({
  type: types.NAME_REQUEST_SUCCESS,
  payload,
});

export const ingredientRequestError = (payload) => ({
  type: types.INGREDIENT_REQUEST_ERROR,
  payload,
});

export const letterRequestError = (payload) => ({
  type: types.LETTER_REQUEST_ERROR,
  payload,
});

export const nameRequestError = (payload) => ({
  type: types.NAME_REQUEST_ERROR,
  payload,
});

// Fetch APIs

// Fetch Recipes APIs

export const fetchIngredientAPI = (value) => async (dispatch) => {
  dispatch(ingredientRequest());
  const path = window.location.pathname;
  if (path === '/comidas') {
    try {
      const data = await fetchFoodAPI(value, 'ingredient');
      return dispatch(ingredientRequestSuccess(data));
    } catch (error) {
      return dispatch(ingredientRequestError(error));
    }
  }
  if (path === '/bebidas') {
    try {
      const data = await fetchDrinksAPI(value, 'ingredient');
      return dispatch(ingredientRequestSuccess(data));
    } catch (error) {
      return dispatch(ingredientRequestError(error));
    }
  }
};

export const fetchNameAPI = (value) => async (dispatch) => {
  dispatch(nameRequest());
  const path = window.location.pathname;
  if (path === '/comidas') {
    try {
      const data = await fetchFoodAPI(value, 'name');
      return dispatch(nameRequestSuccess(data));
    } catch (error) {
      return dispatch(nameRequestError(error));
    }
  }
  if (path === '/bebidas') {
    try {
      const data = await fetchDrinksAPI(value, 'name');
      return dispatch(nameRequestSuccess(data));
    } catch (error) {
      return dispatch(nameRequestError(error));
    }
  }
};

export const fetchLetterAPI = (value) => async (dispatch) => {
  dispatch(letterRequest());
  const path = window.location.pathname;
  if (path === '/comidas') {
    try {
      const data = await fetchFoodAPI(value, 'letter');
      return dispatch(letterRequestSuccess(data));
    } catch (error) {
      return dispatch(letterRequestError(error));
    }
  }
  if (path === '/bebidas') {
    try {
      const data = await fetchDrinksAPI(value, 'letter');
      return dispatch(letterRequestSuccess(data));
    } catch (error) {
      return dispatch(letterRequestError(error));
    }
  }
};

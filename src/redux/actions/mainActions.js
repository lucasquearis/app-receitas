import * as types from './actionTypes';
import fetchRecipesAPI from '../../API/fetchRecipesAPI';

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
  try {
    const data = await fetchRecipesAPI(value, 'ingredient');
    return dispatch(ingredientRequestSuccess(data));
  } catch (error) {
    return dispatch(ingredientRequestError(error));
  }
};

export const fetchNameAPI = (value) => async (dispatch) => {
  dispatch(ingredientRequest());
  try {
    const data = await fetchRecipesAPI(value, 'name');
    return dispatch(nameRequestSuccess(data));
  } catch (error) {
    return dispatch(nameRequestError(error));
  }
};

export const fetchLetterAPI = (value) => async (dispatch) => {
  dispatch(ingredientRequest());
  try {
    const data = await fetchRecipesAPI(value, 'letter');
    return dispatch(letterRequestSuccess(data));
  } catch (error) {
    return dispatch(letterRequestError(error));
  }
};

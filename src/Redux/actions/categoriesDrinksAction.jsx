import {
  getDrinkCategories,
  getDrinksByCategory,
  getAllDrinksCategories } from '../../services/fetchDrinksCategorias';

export const GET_CATEGORIES_DRINK = 'GET_CATEGORIES_DRINK';
export const GET_ALL_DRINK = 'GET_ALL_DRINK';
export const GET_DRINKS_BY_CATEGORY = 'GET_DRINKS_BY_CATEGORY';
export const SELECT_DRINK = 'SELECT_DRINK';

export const getFetchDrinkCategories = (resposta) => ({
  type: GET_CATEGORIES_DRINK,
  payload: resposta,
});

export const getAllDrinks = (resposta) => ({
  type: GET_ALL_DRINK,
  payload: resposta,
});

export const getDrinks = (response) => ({
  type: GET_DRINKS_BY_CATEGORY,
  payload: response,
});

export const selectDrinks = (button) => ({
  type: SELECT_DRINK,
  payload: button,
});

export const getCategoriesDrink = () => async (dispatch) => {
  const resposta = await getDrinkCategories();
  dispatch(getFetchDrinkCategories(resposta));
};

export const getAllDrinksThunk = () => async (dispatch) => {
  const resposta = await getAllDrinksCategories();
  dispatch(getAllDrinks(resposta));
};

export const getDrinksThunk = (selectedCategory) => async (dispatch) => {
  const response = await getDrinksByCategory(selectedCategory);
  console.log(response);
  dispatch(getDrinks(response));
};

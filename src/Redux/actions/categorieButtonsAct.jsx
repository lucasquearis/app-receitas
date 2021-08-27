import {
  getFoodCategories,
  getMealsByCategory,
  getAllMealsCategories } from '../../services/fetchFoodCategories';

export const GET_CATEGORIES_FOOD = 'GET_CATEGORIES_FOOD';
export const GET_ALL_MEALS = 'GET_ALL_MEALS';
export const GET_MEALS_BY_CATEGORY = 'GET_MEALS_BY_CATEGORY';

export const getFetchCategories = (resposta) => ({
  type: GET_CATEGORIES_FOOD,
  payload: resposta,
});

export const getAllFoods = (all) => ({
  type: GET_ALL_MEALS,
  payload: all,
});

export const getMeals = (btn) => ({
  type: GET_MEALS_BY_CATEGORY,
  payload: btn,
});

export const getCategoriesFood = () => async (dispatch) => {
  const resposta = await getFoodCategories();
  dispatch(getFetchCategories(resposta));
};

export const getAllFoodsThunk = () => async (dispatch) => {
  const resposta = await getAllMealsCategories();
  dispatch(getAllFoods(resposta));
};

export const getMealsThunk = (button) => async (dispatch) => {
  const response = await getMealsByCategory(button);
  dispatch(getMeals(response));
};

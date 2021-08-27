import {
  GET_CATEGORIES_FOOD,
  GET_ALL_MEALS,
  GET_MEALS_BY_CATEGORY } from '../actions/categorieButtonsAct';

const INITIAL_STATE = {
  foodCategories: [],
  isLoading: true,
  button: '',
  meals: [],
};

const foodcategories = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  const SEIS = 6;

  switch (type) {
  case GET_CATEGORIES_FOOD:
    payload.meals.unshift({ strCategory: 'All' });
    console.log(payload);
    return {
      ...state,
      foodCategories: payload.meals.slice(0, SEIS),
      isLoading: false };

  case GET_ALL_MEALS:
    return {
      ...state,
      meals: payload.meals,
    };

  case GET_MEALS_BY_CATEGORY:
    return {
      ...state,
      meals: payload.meals,
      button: '',
    };

  default:
    return state;
  }
};

export default foodcategories;

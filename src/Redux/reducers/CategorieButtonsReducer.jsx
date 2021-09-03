import {
  GET_CATEGORIES_FOOD,
  GET_ALL_MEALS,
  GET_MEALS_BY_CATEGORY,
  SELECT_BUTTON } from '../actions/categorieButtonsAct';

const INITIAL_STATE = {
  foodCategories: [],
  isLoading: true,
  meals: [],
  selectedButton: 'none',
  extra: '',
};

const foodcategories = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  const CINCO = 5;
  const DOZE = 12;

  switch (type) {
  case GET_CATEGORIES_FOOD:
    return {
      ...state,
      foodCategories: payload.meals.slice(0, CINCO),
      isLoading: false };

  case GET_ALL_MEALS:
    return {
      ...state,
      meals: payload.meals.slice(0, DOZE),
    };

  case GET_MEALS_BY_CATEGORY:
    return {
      ...state,
      meals: payload.meals.slice(0, DOZE),
      extra: '',
    };

  case SELECT_BUTTON:
    if (state.selectedButton === payload) {
      return {
        ...state,
        selectedButton: 'none',
      };
    }
    return {
      ...state,
      selectedButton: payload,
    };

  default:
    return state;
  }
};

export default foodcategories;

import {
  GET_CATEGORIES_DRINK,
  GET_ALL_DRINK,
  GET_DRINKS_BY_CATEGORY,
  SELECT_DRINK } from '../actions/categoriesDrinksAction';

const INITIAL_STATE = {
  drinksCategories: [],
  isLoading: true,
  drinks: [],
  selectedCategory: 'none',
  extra: '',
};

const drinksReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  const CINCO = 5;
  const DOZE = 12;

  switch (type) {
  case GET_CATEGORIES_DRINK:
    return {
      ...state,
      drinksCategories: payload.drinks.slice(0, CINCO),
      isLoading: false };

  case GET_ALL_DRINK:
    return {
      ...state,
      drinks: payload.drinks.slice(0, DOZE),
    };

  case GET_DRINKS_BY_CATEGORY:
    console.log(payload);
    return {
      ...state,
      drinks: payload.drinks.slice(0, DOZE),
      extra: '',
    };

  case SELECT_DRINK:
    if (state.selectedCategory === payload) {
      return {
        ...state,
        selectedCategory: 'none',
      };
    }
    return {
      ...state,
      selectedCategory: payload,
    };

  default:
    return state;
  }
};

export default drinksReducer;

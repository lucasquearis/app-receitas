import {
  ADD_DRINKS,
  ADD_FOODS,
  ADD_DRINKS_CATEGORIES,
  ADD_FOODS_CATEGORIES,
  ADD_MEAL_DETAIL } from '../actions/actionTypes';

const INITIAL_STATE = {

};

const foodsAndDrinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_FOODS:
    return { ...state, ...action.payload };
  case ADD_DRINKS:
    return { ...state, ...action.payload };
  case ADD_FOODS_CATEGORIES:
    return { ...state, categories: action.payload };
  case ADD_DRINKS_CATEGORIES:
    return { ...state, categories: action.payload };
  case ADD_MEAL_DETAIL:
    return { ...state, details: action.payload };
  default:
    return state;
  }
};

export default foodsAndDrinks;

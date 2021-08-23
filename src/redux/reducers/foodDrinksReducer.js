import { ADD_DRINKS, ADD_FOODS } from '../actions/actionTypes';

const INITIAL_STATE = {

};

const foodsAndDrinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_FOODS:
    return { ...state, ...action.payload };
  case ADD_DRINKS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default foodsAndDrinks;

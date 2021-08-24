import { GET_RECIPES } from '../actions/fetchActions';

const INITIAL_STATE = {
  recipes: [],
};

const meals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_RECIPES:
    return { ...state, recipes: action.payload };
  default:
    return state;
  }
};

export default meals;

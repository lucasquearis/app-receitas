import { GET_RECIPES, GET_CATEGORIES } from '../actions/fetchActions';

const INITIAL_STATE = {
  recipes: [],
};

const meals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_RECIPES:
    return { ...state, recipes: action.payload };
  case GET_CATEGORIES:
    return { ...state, categories: action.payload };
  case 'CLEAR':
    return { ...state, recipes: [] };
  default:
    return state;
  }
};

export default meals;

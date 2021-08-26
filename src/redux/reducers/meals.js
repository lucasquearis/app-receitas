import { GET_RECIPES, GET_CATEGORIES, GET_INGREDIENTS } from '../actions/fetchActions';
import { FILTER_CHANGE } from '../actions/filterAction';

const INITIAL_STATE = {
  recipes: [],
  filter: '',
  ingredients: {},
};

const meals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FILTER_CHANGE:
    return { ...state, filter: action.filter };
  case GET_RECIPES:
    return { ...state, recipes: action.payload };
  case GET_CATEGORIES:
    return { ...state, categories: action.payload };
  case GET_INGREDIENTS:
    return { ...state, ingredients: action.payload };
  case 'CLEAR':
    return { ...state, recipes: [] };
  default:
    return state;
  }
};

export default meals;

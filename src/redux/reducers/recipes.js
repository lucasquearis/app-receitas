import {
  LOADING_RECIPES,
  GET_RECIPES,
  GET_CATEGORIES,
  GET_INGREDIENTS,
} from '../actions/recipesActions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  ingredients: [],
  isLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING_RECIPES:
    return {
      ...state,
      isLoading: true,
    };
  case GET_RECIPES:
    return {
      ...state,
      recipes: action.recipes,
      isLoading: false,
    };
  case GET_CATEGORIES:
    return {
      ...state,
      categories: action.categories,
      isLoading: false,
    };
  case GET_INGREDIENTS:
    return {
      ...state,
      ingredients: action.ingredients,
      isLoading: false,
    };
  default:
    return state;
  }
};

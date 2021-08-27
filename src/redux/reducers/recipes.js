import {
  LOADING_RECIPES,
  GET_RECIPES,
  SEND_RECIPE_DATA,
  GET_CATEGORIES,
} from '../actions/recipesActions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
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
  case SEND_RECIPE_DATA:
    return {
      ...state,
      recipes: action.recipes.data,
    };
  case GET_CATEGORIES:
    return {
      ...state,
      categories: action.categories,
      isLoading: false,
    };
  default:
    return state;
  }
};

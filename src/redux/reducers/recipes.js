import {
  LOADING_RECIPES,
  GET_RECIPES,
} from '../actions/recipesActions';

const INITIAL_STATE = {
  recipes: [],
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
  default:
    return state;
  }
};

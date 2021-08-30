import {
  MEALS,
  MEALS_SUCCESS,
  MEALS_ERROR,
  MEALS_CATEGORIES,
  MEALS_CATEGORIES_SUCCESS,
  MEALS_CATEGORIES_ERROR,
  MEALS_FILTERED_CATEGORY,
  MEALS_FILTERED_CATEGORY_SUCCESS,
  MEALS_FILTERED_CATEGORY_ERROR,
  RECIPE,
  RECIPE_ERROR,
  RECIPE_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  meals: [],
  categories: [],
  error: null,
  recipes: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEALS:
    return { ...state, loading: true };
  case MEALS_SUCCESS:
    return { ...state, meals: [...action.payload], loading: false };
  case MEALS_ERROR:
    return { ...state, error: action.payload, loading: false };
  case MEALS_CATEGORIES:
    return { ...state, loading: true };
  case MEALS_CATEGORIES_SUCCESS:
    return { ...state, categories: [...action.payload], loading: false };
  case MEALS_CATEGORIES_ERROR:
    return { ...state, error: action.payload, loading: false };
  case MEALS_FILTERED_CATEGORY:
    return { ...state, loading: true };
  case MEALS_FILTERED_CATEGORY_SUCCESS:
    return { ...state, meals: [...action.payload], loading: false };
  case MEALS_FILTERED_CATEGORY_ERROR:
    return { ...state, error: action.payload, loading: false };
  case RECIPE:
    return { ...state, loading: true };
  case RECIPE_SUCCESS:
    return { ...state, recipes: [...action.payload], loading: false };
  case RECIPE_ERROR:
    return { ...state, error: action.payload, loading: false };
  default:
    return state;
  }
};

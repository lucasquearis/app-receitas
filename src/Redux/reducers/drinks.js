import {
  DRINKS,
  DRINKS_SUCCESS,
  DRINKS_ERROR,
  DRINKS_CATEGORIES,
  DRINKS_CATEGORIES_SUCCESS,
  DRINKS_CATEGORIES_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  drinks: [],
  categories: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DRINKS:
    return { ...state, loading: true };
  case DRINKS_SUCCESS:
    return { ...state, drinks: [...action.payload], loading: false };
  case DRINKS_ERROR:
    return { ...state, error: action.payload, loading: false };
  case DRINKS_CATEGORIES:
    return { ...state, loading: true };
  case DRINKS_CATEGORIES_SUCCESS:
    return { ...state, categories: [...action.payload], loading: false };
  case DRINKS_CATEGORIES_ERROR:
    return { ...state, error: action.payload, loading: false };
  default:
    return state;
  }
};

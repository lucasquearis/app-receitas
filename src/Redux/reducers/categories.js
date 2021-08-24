import {
  MEAL_CATEGORIE,
  MEAL_CATEGORIE_SUCCESS,
  MEAL_CATEGORIE_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  categories: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEAL_CATEGORIE:
    return {
      ...state,
      loading: true,
    };
  case MEAL_CATEGORIE_SUCCESS:
    return {
      ...state,
      categories: [...action.payload],
      loading: false,
    };
  case MEAL_CATEGORIE_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  default:
    return state;
  }
};

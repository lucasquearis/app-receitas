import {
  INGREDIENT_REQUEST,
  INGREDIENT_REQUEST_ERROR,
  INGREDIENT_REQUEST_SUCCESS, LETTER_REQUEST,
  LETTER_REQUEST_ERROR,
  LETTER_REQUEST_SUCCESS,
  NAME_REQUEST,
  NAME_REQUEST_ERROR,
  NAME_REQUEST_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  search: [],
  error: '',
  isLoading: false,
};

export default function recipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INGREDIENT_REQUEST || NAME_REQUEST || LETTER_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case INGREDIENT_REQUEST_SUCCESS || NAME_REQUEST_SUCCESS || LETTER_REQUEST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      search: action.payload,
    };
  case INGREDIENT_REQUEST_ERROR || NAME_REQUEST_ERROR || LETTER_REQUEST_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  default:
    return state;
  }
}

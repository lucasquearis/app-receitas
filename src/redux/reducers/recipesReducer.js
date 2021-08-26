import {
  CLEAR_SEARCH,
  INGREDIENT_REQUEST,
  INGREDIENT_REQUEST_ERROR,
  INGREDIENT_REQUEST_SUCCESS,
  LETTER_REQUEST,
  LETTER_REQUEST_ERROR,
  LETTER_REQUEST_SUCCESS,
  NAME_REQUEST,
  NAME_REQUEST_ERROR,
  NAME_REQUEST_SUCCESS,
  FOODS_API,
  FOODS_API_SUCCESS,
  FOODS_API_ERROR,
  DRINKS_API,
  DRINKS_API_SUCCESS,
  DRINKS_API_ERROR,
  CATEGORY_API,
  SUCCESS_CATEGORY_API,
  ERROR_CATEGORY_API,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  search: [],
  drinks: [],
  foods: [],
  categories: [],
  error: '',
  isLoading: false,
};

export function recipes(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INGREDIENT_REQUEST:
  case NAME_REQUEST:
  case FOODS_API:
  case LETTER_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case INGREDIENT_REQUEST_SUCCESS:
  case NAME_REQUEST_SUCCESS:
  case LETTER_REQUEST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      search: action.payload,
    };
  case INGREDIENT_REQUEST_ERROR:
  case NAME_REQUEST_ERROR:
  case LETTER_REQUEST_ERROR:
  case FOODS_API_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  case FOODS_API_SUCCESS:
    return {
      ...state,
      isLoading: false,
      foods: action.payload,
    };
  case CLEAR_SEARCH:
    return {
      ...state,
      isLoading: false,
      search: [],
    };
  default:
    return state;
  }
}

export function recipeDrinks(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINKS_API_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  case DRINKS_API:
    return {
      ...state,
      isLoading: true,
    };
  case DRINKS_API_SUCCESS:
    return {
      ...state,
      isLoading: false,
      drinks: action.payload,
    };
  default:
    return state;
  }
}

export function reducerCategories(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ERROR_CATEGORY_API:
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  case CATEGORY_API:
    return {
      ...state,
      isLoading: true,
    };
  case SUCCESS_CATEGORY_API:
    return {
      ...state,
      isLoading: false,
      categories: action.payload,
    };
  default:
    return state;
  }
}

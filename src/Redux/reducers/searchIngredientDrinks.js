import {
  SEARCH_INGREDIENT_DRINKS,
  SEARCH_INGREDIENT_DRINKS_SUCCESS,
  SEARCH_INGREDIENT_DRINKS_ERROR,
} from '../actions/actionTypes';

const initialState = { search: [], loading: false, error: null };

const searchIngredientDrinksReducer = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_INGREDIENT_DRINKS:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case SEARCH_INGREDIENT_DRINKS_SUCCESS:
    return {
      ...state,
      loading: false,
      search: [...action.payload],
    };
  case SEARCH_INGREDIENT_DRINKS_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default searchIngredientDrinksReducer;

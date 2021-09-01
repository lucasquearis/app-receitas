import { IS_FETCHING, FETCH_ERROR, GET_RECIPES, SET_INGREDIENT } from '../types';

const INITIAL_STATE = {
  recipes: [],
  selectIngredient: '',
  isFetching: false,
};

function recipesReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
  case IS_FETCHING: return { ...state, isFetching: true, recipes: [] };
  case FETCH_ERROR: return { ...state, isFetching: false };
  case GET_RECIPES: return { ...state, recipes: [...payload.recipes], isFetching: false };
  case SET_INGREDIENT: return { ...state, selectIngredient: payload.ingredient };
  default: return state;
  }
}

export default recipesReducer;

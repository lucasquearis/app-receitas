import { IS_FETCHING, FETCH_SUCCESS, FETCH_ERROR, GET_RECIPES } from '../types';

const INITIAL_STATE = {
  recipes: [],
  isFetching: false,
};

function recipesReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
  case IS_FETCHING: return { ...state, isFetching: true };
  case FETCH_SUCCESS: return { ...state, isFetching: false };
  case FETCH_ERROR: return { ...state, isFetching: false };
  case GET_RECIPES: return { ...state, recipes: [...payload.recipes], isFetching: false };
  default: return state;
  }
}

export default recipesReducer;

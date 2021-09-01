import { STORE_IN_PROCESS_FOOD, STORE_IN_PROCESS_COCKTAIL } from '../actions/actionsType';

const INITIAL_STATE = {
  meals: {},
  cocktails: {},
};

const inProcessReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_IN_PROCESS_FOOD:
    return {
      meals: {
        ...state.meals,
        [action.payload.id]: [...action.payload.ingredients],
      },
    };
  case STORE_IN_PROCESS_COCKTAIL:
    return {
      cocktails: {
        ...state.cocktails,
        [action.payload.id]: [...action.payload.ingredients],
      },
    };
  default:
    return state;
  }
};

export default inProcessReducer;

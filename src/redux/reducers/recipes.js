import { SEND_RECIPE_DATA } from '../actions/recipeActions';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_RECIPE_DATA:
    return { ...state, data: action.info.data.meals };
  default:
    return state;
  }
};

import { DETAILS_RECIPE } from '../actions/actionSetRecipeDetails';

const INITIAL_STATE = {
  recipeDetail: [],
};

const recipeDetails = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case DETAILS_RECIPE:
    return { ...state, recipeDetails: payload };

  default:
    return state;
  }
};

export default recipeDetails;

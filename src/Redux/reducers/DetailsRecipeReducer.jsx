import { MEAL_RECIPE, DRINK_RECIPE } from '../actions/actionSetRecipeDetails';

const INITIAL_STATE = {
  mealDetail: {},
  drinkDetail: {},
};

const recipeDetails = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case MEAL_RECIPE:
    return { ...state, mealDetails: payload };

  case DRINK_RECIPE:
    return { ...state, drinkDetails: payload };

  default:
    return state;
  }
};

export default recipeDetails;

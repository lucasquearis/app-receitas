import { MEAL_RECIPE, DRINK_RECIPE } from '../actions/actionSetRecipeDetails';

const INITIAL_STATE = {
  mealDetail: {},
  drinkDetail: {},
}

const recipeDetails = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case MEAL_RECIPE:
    return { ...state, mealDetail: payload };

  case DRINK_RECIPE:
    return { ...state, drinkDetail: payload };

  default:
    return state;
  }
};

export default recipeDetails;

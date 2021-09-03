export const DRINK_RECIPE = 'DRINK_RECIPE';
export const MEAL_RECIPE = 'MEAL_RECIPE';

export const setMealDetails = (recipe) => ({
  type: MEAL_RECIPE,
  payload: recipe,
});

export const setDrinkDetails = (recipe) => ({
  type: DRINK_RECIPE,
  payload: recipe,
});

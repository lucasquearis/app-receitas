export const DETAILS_RECIPE = 'DETAILS_RECIPE';

export const setRecipeDetails = (recipe) => ({
  type: DETAILS_RECIPE,
  payload: recipe,
});

export const SEND_RECIPE_DATA = 'SEND_RECIPE_DATA';

export const sendRecipeData = (info) => ({
  type: SEND_RECIPE_DATA, info,
});

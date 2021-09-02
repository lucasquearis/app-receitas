export const ADD_FAVORITE_RECIPE = 'ADD_FAVORITE_RECIPE';
export const REMOVE_FAVORITE_RECIPE = 'REMOVE_FAVORITE_RECIPE';

export const addFavoriteRecipe = (payload) => ({
  type: ADD_FAVORITE_RECIPE,
  payload,
});

export const removeFavoriteRecipe = (payload) => ({
  type: REMOVE_FAVORITE_RECIPE,
  payload,
});

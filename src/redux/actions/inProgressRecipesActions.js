export const ADD_COCKTAIL = 'ADD_COCKTAIL';
export const ADD_MEAL = 'ADD_MEAL';
export const REMOVE_COCKTAIL = 'REMOVE_COCKTAIL';
export const REMOVE_MEAL = 'REMOVE_MEAL';

export const addCocktail = (payload) => ({
  type: ADD_COCKTAIL,
  payload,
});

export const addMeal = (payload) => ({
  type: ADD_MEAL,
  payload,
});

export const removeCocktail = (payload) => ({
  type: REMOVE_COCKTAIL,
  payload,
});

export const removeMeal = (payload) => ({
  type: REMOVE_MEAL,
  payload,
});

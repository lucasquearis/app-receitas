export const ADD_COCKTAIL = 'ADD_COCKTAIL';
export const ADD_MEAL = 'ADD_MEAL';

export const addCocktail = (payload) => ({
  type: ADD_COCKTAIL,
  payload,
});

export const addMeal = (payload) => ({
  type: ADD_MEAL,
  payload,
});

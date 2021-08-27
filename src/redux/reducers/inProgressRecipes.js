import { ADD_COCKTAIL, ADD_MEAL, REMOVE_COCKTAIL,
  REMOVE_MEAL } from '../actions/inProgressRecipesActions';

const INITIAL_STATE = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
  cocktails: {},
  meals: {},
};

const inProgressRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_COCKTAIL:
  { const newState = { ...state,
    cocktails: { ...state.cocktails, [action.payload.id]: action.payload.ingredients } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
  return newState; }
  case ADD_MEAL:
  { const newState = { ...state,
    meals: { ...state.meals, [action.payload.id]: action.payload.ingredients } };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
  return newState; }
  case REMOVE_COCKTAIL:
  { const newCocktails = { ...state.cocktails };
    delete newCocktails[action.payload];
    const newState = { ...state, cocktails: newCocktails };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
    return newState; }
  case REMOVE_MEAL:
  { const newMeals = { ...state.meals };
    delete newMeals[action.payload];
    const newState = { ...state, meals: newMeals };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newState));
    return newState; }
  default:
    return state;
  }
};

export default inProgressRecipes;

import { ADD_FAVORITE_RECIPE,
  REMOVE_FAVORITE_RECIPE } from '../actions/favoriteRecipesActions';

const INITIAL_STATE = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

const favoriteRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_FAVORITE_RECIPE:
  { const newState = [...state, action.payload];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    return newState; }
  case REMOVE_FAVORITE_RECIPE:
  { const newState = state.filter((recipe) => recipe.id !== action.payload);
    console.log(newState);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    return newState; }
  default:
    return state;
  }
};

export default favoriteRecipes;

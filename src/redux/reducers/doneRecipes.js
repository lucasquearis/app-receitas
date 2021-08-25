import { ADD_DONE_RECIPE } from '../actions/doneRecipesActions';

const INITIAL_STATE = JSON.parse(localStorage.getItem('doneRecipes')) || [];

const doneRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_DONE_RECIPE:
  { const newState = [...state, action.payload];
    localStorage.setItem('doneRecipes', JSON.stringify(newState));
    return newState; }
  default:
    return state;
  }
};

export default doneRecipes;

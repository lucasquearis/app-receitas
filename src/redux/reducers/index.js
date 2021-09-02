import { combineReducers } from 'redux';
import meals from './meals';
import doneRecipes from './doneRecipes';
import inProgressRecipes from './inProgressRecipes';
import favoriteRecipes from './favoriteRecipes';

const rootReducer = combineReducers({
  meals, doneRecipes, inProgressRecipes, favoriteRecipes });

export default rootReducer;

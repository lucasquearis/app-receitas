import { combineReducers } from 'redux';
import user from './user';
import recipes from './recipes';
import doneRecipes from './doneRecipes';

export default combineReducers({ user, recipes, doneRecipes });

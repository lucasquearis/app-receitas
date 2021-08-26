import { combineReducers } from 'redux';
import meals from './meals';
import doneRecipes from './doneRecipes';
import inProgressRecipes from './inProgressRecipes';

const rootReducer = combineReducers({ meals, doneRecipes, inProgressRecipes });

export default rootReducer;

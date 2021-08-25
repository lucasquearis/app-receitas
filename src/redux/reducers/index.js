import { combineReducers } from 'redux';
import meals from './meals';
import doneRecipes from './doneRecipes';

const rootReducer = combineReducers({ meals, doneRecipes });

export default rootReducer;

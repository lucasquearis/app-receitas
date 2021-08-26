import { combineReducers } from 'redux';
import food from './foodReducer';
import drink from './drinkReducer';
import recipes from './recipesReducer';

const rootReducer = combineReducers({ food, drink, recipes });

export default rootReducer;

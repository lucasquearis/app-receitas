import { combineReducers } from 'redux';
import food from './foodReducer';
import drink from './drinkReducer';

const rootReducer = combineReducers({ food, drink });

export default rootReducer;

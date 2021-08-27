import { combineReducers } from 'redux';
import foodsAndDrinks from './foodDrinksReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers({ foodsAndDrinks, favoriteReducer });
export default rootReducer;

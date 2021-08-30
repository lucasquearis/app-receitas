import { combineReducers } from 'redux';
import foodsAndDrinks from './foodDrinksReducer';

const rootReducer = combineReducers({ foodsAndDrinks });
export default rootReducer;

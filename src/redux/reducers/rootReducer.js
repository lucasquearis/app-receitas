import { combineReducers } from 'redux';
import login from './loginReducer';
import { recipes, recipeDrinks } from './recipesReducer';

const rootReducer = combineReducers({
  login,
  recipes,
  recipeDrinks,
});

export default rootReducer;

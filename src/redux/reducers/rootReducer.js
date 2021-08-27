import { combineReducers } from 'redux';
import login from './loginReducer';
import { recipes, recipeDrinks, reducerCategories } from './recipesReducer';

const rootReducer = combineReducers({
  login,
  recipes,
  recipeDrinks,
  reducerCategories,
});

export default rootReducer;

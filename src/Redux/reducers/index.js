import { combineReducers } from 'redux';
import user from './user';
import categories from './categories';
import recipesMeal from './recipesMeal';

const rootReducer = combineReducers({
  user,
  categories,
  recipesMeal,
});

export default rootReducer;

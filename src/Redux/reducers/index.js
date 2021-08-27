import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import recipesMeal from './recipesMeal';

const rootReducer = combineReducers({
  user,
  foods,
  drinks,
  
  recipesMeal,
});

export default rootReducer;

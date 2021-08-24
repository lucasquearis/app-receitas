import { combineReducers } from 'redux';
import login from './loginReducer';
import recipes from './recipesReducer';

const rootReducer = combineReducers({
  login,
  recipes,
});

export default rootReducer;

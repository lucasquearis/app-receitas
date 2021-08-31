import { combineReducers } from 'redux';
import user from './user';
import drinkReducer from './drinkReducer';
import foodReducer from './foodReducer';
import searchBarReducer from './searchBarReducer';

const rootReducer = combineReducers({
  user,
  drinkReducer,
  foodReducer,
  searchBarReducer,
});

export default rootReducer;

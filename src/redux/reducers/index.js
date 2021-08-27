import { combineReducers } from 'redux';
import user from './user';
import drinkReducer from './drinkReducer';
import foodReducer from './foodReducer';

const rootReducer = combineReducers({
  user,
  drinkReducer,
  foodReducer,
});

export default rootReducer;

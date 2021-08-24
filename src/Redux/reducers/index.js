import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';

const rootReducer = combineReducers({
  user,
  foods,
});

export default rootReducer;

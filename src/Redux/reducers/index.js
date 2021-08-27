import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';

const rootReducer = combineReducers({
  user,
  foods,
  drinks,
});

export default rootReducer;

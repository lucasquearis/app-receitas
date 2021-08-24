import { combineReducers } from 'redux';
import user from './user';
import categories from './categories';

const rootReducer = combineReducers({
  user,
  categories,
});

export default rootReducer;

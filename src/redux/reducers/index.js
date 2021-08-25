import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';

const rootReducers = combineReducers({
  recipesReducer,
});

export default rootReducers;

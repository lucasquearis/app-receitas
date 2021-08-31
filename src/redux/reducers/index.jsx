import { combineReducers } from 'redux';
import reducer from './reducer';
import favoriteReducer from './favoriteReducer';

const rootReducers = combineReducers({ reducer, favoriteReducer });

export default rootReducers;

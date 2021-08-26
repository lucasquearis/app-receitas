import { combineReducers } from 'redux';
import itemsReducer from './items';

const reducer = combineReducers({ itemsReducer });

export default reducer;

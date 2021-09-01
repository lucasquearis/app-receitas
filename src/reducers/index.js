import { combineReducers } from 'redux';
import itemsReducer from './items';
import inProcessReducer from './inProcess';

const reducer = combineReducers({ itemsReducer, inProcessReducer });

export default reducer;

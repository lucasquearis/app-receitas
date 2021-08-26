import { combineReducers } from 'redux';
import reducer from './reducer';
import reducerSurpriseMeals from './reducerSurprise';

const rootReducers = combineReducers({ reducer, reducerSurpriseMeals });

export default rootReducers;

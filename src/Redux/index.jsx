import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(combineReducers(mainPage), composeWithDevTools);

export default store;

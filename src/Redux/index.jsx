import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import foodcategories from './reducers/CategorieButtonsReducer';

const store = createStore(
  combineReducers(mainPage, foodcategories), composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

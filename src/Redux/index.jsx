import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import foodcategories from './reducers/CategorieButtonsReducer';
import mainPage from './reducers/MainPageReducer';

const store = createStore(
  combineReducers({
    mainPage, foodcategories,
  }), composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import foodcategories from './reducers/CategorieButtonsReducer';
import mainPage from './reducers/MainPageReducer';
import drinksReducer from './reducers/CategorieDrinksReducer';

const store = createStore(
  combineReducers({
    mainPage, foodcategories, drinksReducer,
  }), composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

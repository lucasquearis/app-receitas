import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import searchIngredientReducer from './searchIngredientMeals';
import searchLetterReducer from './searchLetterMeals';
import searchIngredientDrinksReducer from './searchIngredientDrinks';
import searchLetterDrinksReducer from './searchLetterDrinks';

const rootReducer = combineReducers({
  user,
  foods,
  drinks,
  searchIngredientReducer,
  searchLetterReducer,
  searchIngredientDrinksReducer,
  searchLetterDrinksReducer,
});

export default rootReducer;

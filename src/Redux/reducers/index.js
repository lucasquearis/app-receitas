import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import searchIngredientReducer from './searchIngredientMeals';
import searchNomeReducer from './searchNomeMeals';
import searchLetterReducer from './searchLetterMeals';
import searchIngredientDrinksReducer from './searchIngredientDrinks';
import searchLetterDrinksReducer from './searchLetterDrinks';
import searchNomeDrinksReducer from './searchNomeDrinks';

const rootReducer = combineReducers({
  user,
  foods,
  drinks,
  searchIngredientReducer,
  searchLetterReducer,
  searchNomeReducer,
  searchIngredientDrinksReducer,
  searchLetterDrinksReducer,
  searchNomeDrinksReducer,
});

export default rootReducer;

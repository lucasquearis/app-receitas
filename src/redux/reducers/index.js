import { combineReducers } from 'redux';
import user from './user';
import recipes from './recipes';
import cocktail from './cocktail';

export default combineReducers({ user, recipes, cocktail });

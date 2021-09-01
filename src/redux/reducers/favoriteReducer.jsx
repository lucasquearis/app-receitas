import { ADD_FAVORITE, REMOVE_FAVORITE, START_FAVORITES } from '../actions';

const INITIAL_STATE = (localStorage.getItem('favoriteRecipes'))
  ? (JSON.parse(localStorage.getItem('favoriteRecipes'))) : [];

const favoriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REMOVE_FAVORITE: {
    const newState = [...state].filter((recipe) => recipe.id !== action.payload.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    return (newState);
  }
  case ADD_FAVORITE: {
    const newState = [...state, action.payload];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    return (newState);
  }
  case START_FAVORITES:
    return (state);
  default:
    return (state);
  }
};

export default favoriteReducer;

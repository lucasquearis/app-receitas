import { FAVORITE } from '../actions/actionTypes';

const INITIAL_STATE = {};

const favoriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FAVORITE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default favoriteReducer;

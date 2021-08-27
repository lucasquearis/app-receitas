import { SEND_COCKTAIL_DATA } from '../actions/cocktailsActions';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_COCKTAIL_DATA:
    return { ...state, data: action.info.data.drinks };
  default:
    return state;
  }
};

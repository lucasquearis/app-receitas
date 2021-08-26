import { REQUEST_ITEMS, REQUEST_SUCCESS, STORE_ITEMS } from '../actions/actionsType';

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  response: false,
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_ITEMS:
    return {
      ...state, items: action.payload,
    };
  case REQUEST_ITEMS:
    return {
      ...state, isLoading: true,
    };
  case REQUEST_SUCCESS:
    return {
      ...state,
      items: action.payload,
      isLoading: false,
      response: true,
    };
  default:
    return state;
  }
};

export default itemsReducer;

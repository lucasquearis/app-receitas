import { SAVE_ITEMS } from '../actions/actionsType';

const INITIAL_STATE = {
  items: [],
};

const itemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_ITEMS:
    return { items: action.value };
  default:
    return state;
  }
};

export default itemsReducer;

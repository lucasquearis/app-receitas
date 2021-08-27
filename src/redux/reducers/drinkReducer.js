import { DRINK_LIST_SUCCESS } from '../actions/actionDrink';

const INITIAL_STATE = {
  drinksCardList: [],
};

function drinkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINK_LIST_SUCCESS:
    return {
      ...state,
      drinksCardList: action.payload,
    };
  default:
    return state;
  }
}

export default drinkReducer;

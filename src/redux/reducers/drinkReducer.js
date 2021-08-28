import { DRINK_LIST_SUCCESS } from '../actions/actionDrink';

const INITIAL_STATE = {
  drinkCardList: [],
};

const cardLenght = 12;

function drinkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINK_LIST_SUCCESS:
    return {
      ...state,
      drinkCardList: action.payload.slice(0, cardLenght),
    };
  default:
    return state;
  }
}

export default drinkReducer;

import { FOOD_LIST_SUCCESS } from '../actions/actionFood';

const INITIAL_STATE = {
  foodCardList: [],
};

const cardLenght = 12;

function foodReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOOD_LIST_SUCCESS:
    return {
      ...state,
      foodCardList: action.payload.slice(0, cardLenght),
    };
  default:
    return state;
  }
}

export default foodReducer;

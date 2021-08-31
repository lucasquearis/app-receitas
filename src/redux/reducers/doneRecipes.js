import {
  DONE_FOOD,
  DONE_DRINK,
} from '../actions/doneRecipesActions';

const INITIAL_STATE = {
  food: [],
  drink: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DONE_FOOD:
    return {
      ...state,
      food: [...state.food, action.food],
    };
  case DONE_DRINK:
    return {
      ...state,
      drink: [...state.drink, action.drink],
    };
  default:
    return state;
  }
};

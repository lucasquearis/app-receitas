import { GET_FOODS_SUCCESS,
  GET_DRINKS_SUCCESS,
  CHANGE_FOOD_SEARCH } from '../actions/apiActions';

const INICIAL_STATE = {
  mealsBar: [],
  drinks: [],
  foodSearch: {
    type: '',
    entry: '',
  },
  drinkSearch: {
    type: '',
    entry: '',
  },
};

const DOZE = 12;

const mainPage = (state = INICIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
  case GET_FOODS_SUCCESS:
    return { ...state, mealsBar: payload.mealsBar.slice(0, DOZE) };

  case GET_DRINKS_SUCCESS:
    return { ...state, drinks: payload };

  case CHANGE_FOOD_SEARCH:
    return { ...state, foodSearch: payload };

  default:
    return state;
  }
};

export default mainPage;

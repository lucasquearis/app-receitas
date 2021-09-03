import { GET_FOODS_SUCCESS,
  GET_DRINKS_SUCCESS,
  CHANGE_FOOD_SEARCH,
  CHANGE_SHOWBAR } from '../actions/apiActions';

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
  showBar: false,
};

const DOZE = 12;

const mainPage = (state = INICIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
  case GET_FOODS_SUCCESS:
    return { ...state, mealsBar: payload.meals.slice(0, DOZE) };

  case GET_DRINKS_SUCCESS:
    return { ...state, drinks: payload };

  case CHANGE_FOOD_SEARCH:
    return { ...state, foodSearch: payload };

  case CHANGE_SHOWBAR:
    return {
      ...state,
      showBar: payload,
    };

  default:
    return state;
  }
};

export default mainPage;

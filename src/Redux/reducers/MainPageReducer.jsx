import { GET_FOODS_SUCCESS, GET_DRINKS_SUCCESS } from '../actions/apiActions';

const INICIAL_STATE = {
  meals: [],
  drinks: [],
  search: {
    type: '',
    entry: '',
  },
};

const mainPage = (state = INICIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
  case GET_FOODS_SUCCESS:
    return { ...state, meals: payload };

  case GET_DRINKS_SUCCESS:
    return { ...state, drinks: payload };

  default:
    return state;
  }
};

export default mainPage;

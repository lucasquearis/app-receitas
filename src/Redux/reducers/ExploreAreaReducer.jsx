import EXPLORE_AREA from '../actions/FoodExplore';

const INITIAL_STATE = {
  Areas: [],
  meals: [],
  isLoading: true,
};
const areas = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case EXPLORE_AREA:
    return {
      ...state,
      Areas: payload,
      isLoading: false,
    };

  default:
    return state;
  }
};

export default areas;

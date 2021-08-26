export const TOGGLE_FILTER = 'TOGGLE_TYPE';

const INITIAL_STATE = {
  filter: 'All',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOGGLE_FILTER:
    return {
      ...state,
      filter: action.payload,
    };
  default:
    return state;
  }
};

export default recipes;

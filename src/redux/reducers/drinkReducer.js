export const NEW_DRINK_SEARCH = 'NEW_DRINK_SEARCH';
export const DRINK_RESPONSE = 'DRINK_RESPONSE';
export const DRINK_ERROR_RESPONSE = 'DRINK_ERROR_RESPONSE';

const INITIAL_STATE = {
  drinks: [],
  loading: true,
  error: false,
};

const drink = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_DRINK_SEARCH:
    return {
      ...state,
      loading: true,
    };
  case DRINK_RESPONSE:
    return {
      ...state,
      loading: false,
      drinks: action.payload,
    };
  case DRINK_ERROR_RESPONSE:
    return {
      ...state,
      loading: false,
      error: true,
    };
  default:
    return state;
  }
};

export default drink;

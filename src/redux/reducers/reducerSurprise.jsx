import { GET_SURPRISE, GET_SURPRISE_SUCCESS, GET_SURPRISE_ERROR } from "../actions";

const INITIAL_STATE = {
  meals: [],
  isLoading: false,
  error: null,
};

const reducerSurpriseMeals = (state = INITIAL_STATE, action) => {
  switch(action.type) {
  case GET_SURPRISE:
    return {
      ...state,
      isLoading: true,
    };
  case GET_SURPRISE_SUCCESS:
    return {
      ...state,
      isLoading:false,
      meals: action.payload,
    };
  case GET_SURPRISE_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default reducerSurpriseMeals;

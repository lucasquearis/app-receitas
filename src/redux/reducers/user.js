import { EMAIL } from '../actions/actionLogin';

const INIT_STATE = {
  email: '',
};

const user = (state = INIT_STATE, action) => {
  switch (action.type) {
  case EMAIL:
    return {
      ...state,
      email: action.payload.email,
    };

  default:
    return state;
  }
};

export default user;

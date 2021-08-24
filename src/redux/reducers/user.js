import { SEND_USER_INFO } from '../actions/userActions';

const INITIAL_STATE = {
  email: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_INFO:
    return { ...state, email: action.info.email };
  default:
    return state;
  }
};

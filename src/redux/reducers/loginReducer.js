import { createReducer } from '@reduxjs/toolkit';
import LOGIN from '../actions/loginAction';

const INITIAL = {
  user: '',
};

const login = createReducer(INITIAL, (builder) => {
  builder.addCase(LOGIN, (state, action) => ({
    ...state,
    user: action.payload,
  }));
  builder.addDefaultCase((state) => state);
});

export default login;

import * as types from './actionTypes';

// Action Creators - Login Actions

export const loginAction = (payload) => ({
  type: types.LOGIN,
  payload,
});

export const exampleAction = (payload) => ({
  type: types.EXAMPLE_REQUEST_SUCCESS,
  payload,
});

// Fetch APIs

import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';
import rootReducers from '../redux/reducers';

export const getStore = (initialState) => {
  if(!initialState) return createStore(rootReducers, applyMiddleware(thunk));
  return createStore(rootReducers, initialState, applyMiddleware(thunk));
};
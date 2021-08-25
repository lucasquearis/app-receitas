import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import rootReducer from '../redux/reducers/rootReducer';

const renderWithReduxAndRouter = (
  routes,
  {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = {},
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => ({
  ...render(
    <Provider store={ store }>
      <Router history={ history }>
        <Switch>{routes}</Switch>
      </Router>
    </Provider>,
  ),
  store,
  history,
});

export default renderWithReduxAndRouter;

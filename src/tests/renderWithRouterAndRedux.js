import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';

const renderWithRouterAndRedux = (component, {
  initialState = {
    meals: {
      recipes: [],
      filter: '',
      ingredients: {},
      areas: {},
    },
    doneRecipes: JSON.parse(localStorage.getItem('doneRecipes')) || [],
    inProgressRecipes: JSON.parse(localStorage.getItem('inProgressRecipes')) || {
      cocktails: {},
      meals: {},
    },
  },
  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  ),
  initialEntries = ['/'],
} = {}) => {
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <Router history={ history }>
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;

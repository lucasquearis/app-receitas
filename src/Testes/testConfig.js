import React, { useState } from 'react';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';
import rootReducers from '../redux/reducers';
import RecipesContext from '../context/RecipesContext';
import useAPI from '../hooks/useAPI';

export const getStore = (initialState) => {
  if(!initialState) return createStore(rootReducers, applyMiddleware(thunk));
  return createStore(rootReducers, initialState, applyMiddleware(thunk));
};

function ProviderContext({ children }) {
  const pathname = '/comidas';
  const API = useAPI(pathname);

  const [register, setRegister] = useState('');
  const context = { register, setRegister, API };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

export const renderWithRouterAndStore = (component, routeConfigs = {}, initialState) => {
  const route = routeConfigs.route || '/';
  const store = getStore(initialState);
  const history = routeConfigs.history
    || createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <ProviderContext>
        <Router history={ history }>{component}</Router>
      </ProviderContext>,
    ),
    history,
    store,
  };
};

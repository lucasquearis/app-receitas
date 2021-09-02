import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import DataContext from '../Context/DataContext';
import Routes from '../routes';

export default function renderWithRouterAndDataContext(route = '/') {
  let testLocation;
  return {
    ...render(
      <DataContext>
        <MemoryRouter initialEntries={ [route] }>
          <Routes />
          <Route
            path="*"
            render={ ({ location }) => {
              testLocation = location;
              return null;
            } }
          />
        </MemoryRouter>
      </DataContext>,
    ),
    pathname: () => testLocation.pathname,
  };
}

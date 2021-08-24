import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

test('Farewell, front-end', () => {
  const { getByText } = renderWithRouter(<App />);
  const emailLabel = getByText(/Email:/i);
  const passwordlLabel = getByText(/Senha:/i);
  expect(emailLabel).toBeInTheDocument();
  expect(passwordlLabel).toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const test = 'test';
  expect(test).toBeInTheDocument();
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});

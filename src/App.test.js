import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

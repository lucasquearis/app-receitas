import React from 'react';
import { render } from '@testing-library/react';
import index from './index';

test('Farewell, front-end', () => {
  const { getByText } = render(<index />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});

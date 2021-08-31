import React from 'react';
import NotFound from '../pages/NotFound/NotFound';

describe('testa a página NotFound ', () => {
  test('testa a rota', () => {
    const { history, getByText } = renderWithRouterAndDataContext(<NotFound />);
    history.push('/bebidas/kndued');
    const notFound = getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});

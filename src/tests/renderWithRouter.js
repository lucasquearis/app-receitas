import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const mockHistory = createMemoryHistory();

  return { ...render(
    <Router history={ mockHistory }>
      { component }
    </Router>,
  ),
  history: mockHistory,
  };
};

export default renderWithRouter;

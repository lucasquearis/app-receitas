import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Page from '../pages/Page';

const PROFILE_BTN_SELECTOR = 'profile-top-btn';
const SEARCH_BTN_SELECTOR = 'search-top-btn';
const PAGE_TITLE_SELECTOR = 'page-title';

describe('Header tests', () => {
  it('Should have a header with profile icon, title and search icon', () => {
    renderWithRouter(<Page />);
    expect(screen.getByTestId(PROFILE_BTN_SELECTOR)).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE_SELECTOR)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_BTN_SELECTOR)).toBeInTheDocument();
  });

  it('Redirect to profile page when clicking profile button', () => {
    const { history } = renderWithRouter(<Page />);
    fireEvent.click(screen.getByTestId(PROFILE_BTN_SELECTOR));
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it.skip('Show search bar when clicking search icon', () => {
    renderWithRouter(<Page />);
    fireEvent.click(screen.getByTestId(SEARCH_BTN_SELECTOR));
    expect(screen.findByTestId('search-input')).toBeInTheDocument();
  });
});

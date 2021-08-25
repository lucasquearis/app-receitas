import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const PROFILE_BTN_SELECTOR = 'profile-top-btn';
const SEARCH_BTN_SELECTOR = 'search-top-btn';
const PAGE_TITLE_SELECTOR = 'page-title';

describe('Header tests', () => {
  it('Should have a header with profile icon, title and search icon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(screen.findByTestId(PROFILE_BTN_SELECTOR)).toBeDefined();
    expect(screen.findByTestId(PAGE_TITLE_SELECTOR)).toBeDefined();
    expect(screen.findByTestId(SEARCH_BTN_SELECTOR)).toBeDefined();
  });

  it('Redirect to profile page when clicking profile button', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const profileBtn = await screen.findByTestId(PROFILE_BTN_SELECTOR);
    fireEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('Show search bar when clicking search icon', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const searchBtn = await screen.findByTestId(SEARCH_BTN_SELECTOR);
    fireEvent.click(searchBtn);
    expect(screen.findByTestId('search-input')).toBeDefined();
  });
});

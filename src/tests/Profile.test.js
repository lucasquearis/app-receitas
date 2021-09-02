import React from 'react';
// import { findByText, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Profile Page Tests', () => {
  it('verificando botoes da pagina', async () => {
    const { queryByTestId } = renderWithRouter(<Profile />);
    expect(queryByTestId('profile-done-btn')).toBeInTheDocument();
    expect(queryByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(queryByTestId('profile-logout-btn')).toBeInTheDocument();
  });
  it('verificando email da pagina', async () => {
    localStorage.setItem('user', JSON.stringify({ email: 'email@mail.com' }));
    renderWithRouter(<Profile />);
    await screen.findByText(/email@mail.com/i);
    // expect(await findByText(/email@mail.com/)).toBeInTheDocument();
  });

  it('verifinado o local storage', async () => {
    jest.spyOn(window.localStorage.__proto__, 'clear').mockImplementation(() => {});
    const { history } = renderWithRouter(<Profile />);
    // const botao = queryByTestId('profile-logout-btn');
    const botao = await screen.findByTestId('profile-logout-btn');
    userEvent.click(botao);
    // fireEvent.click(botao);
    expect(history.location.pathname).toBe('/');
    expect(window.localStorage.clear).toHaveBeenCalled();
  });
  it('verificando fav', async () => {
    const { history } = renderWithRouter(<Profile />);
    // const botao = queryByTestId('profile-logout-btn');
    const botao = await screen.findByTestId('profile-done-btn');
    userEvent.click(botao);
    // fireEvent.click(botao);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });
  it('verificando fav2', async () => {
    const { history } = renderWithRouter(<Profile />);
    // const botao = queryByTestId('profile-logout-btn');
    const botao = await screen.findByTestId('profile-favorite-btn');
    userEvent.click(botao);
    // fireEvent.click(botao);
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });
});

import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o Footer', () => {
  beforeEach(() => {
    const { getByTestId } = renderWithRouter(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '123456789');
    userEvent.click(loginBtn);
  });
  it('Testa Elemento com o atributo data-testid="footer"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const menu = getByTestId('footer');
    expect(menu).toBeInTheDocument();
  });
  it('Testa Elemento com o atributo data-testid="drinks-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const drinks = getByTestId('drinks-bottom-btn');
    expect(drinks).toBeInTheDocument();
    expect(drinks).toHaveAttribute('src', 'drinkIcon.svg');
    userEvent.click(drinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
  it('Testa Elemento com o atributo data-testid="explore-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const explore = getByTestId('explore-bottom-btn');
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveAttribute('src', 'exploreIcon.svg');
    userEvent.click(explore);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
  it('Testa Elemento com o atributo data-testid="food-bottom-btn"', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const foods = getByTestId('food-bottom-btn');
    expect(foods).toBeInTheDocument();
    expect(foods).toHaveAttribute('src', 'mealIcon.svg');
    userEvent.click(foods);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
  it('O menu inferior deve ficar fixado sempre ao final da página', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const menu = getByTestId('footer');
    expect(menu).toHaveStyle('position: absolute; bottom: 0');
  });
});

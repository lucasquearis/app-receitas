import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../Components/Footer';
import App from '../App';

describe('Testando componente Footer', () => {
  beforeEach(() => {
    renderWithRouter(<Footer />);
  });

  test('Testa se possui o data-testid="footer"', () => {
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  test('Testa se possui o data-testid="drinks-bottom-btn"', () => {
    const drinks = screen.getByTestId('drinks-bottom-btn');

    expect(drinks).toBeInTheDocument();
  });

  test('Testa se possui o data-testid="explore-bottom-btn"', () => {
    const explore = screen.getByTestId('explore-bottom-btn');

    expect(explore).toBeInTheDocument();
  });

  test('Testa se possui o data-testid="food-bottom-btn"', () => {
    const food = screen.getByTestId('food-bottom-btn');

    expect(food).toBeInTheDocument();
  });
});

describe('Testa se possui footer nas páginas', () => {
  test('Testando as rotas', () => {
    let history = {};
    history = renderWithRouter(<App />).history;

    // verificando se o footer não possui na pagina de Login
    const searchFooter = screen.queryByTestId('footer');
    expect(searchFooter).toBeNull();

    // verificando se possui footer na pagina de Comidas
    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se possui footer na pagina de Bebidas
    history.push('/bebidas');
    expect(history.location.pathname).toBe('/bebidas');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se o footer não possui na pagina de Detalhes de comidas
    history.push('/comidas/:id');
    expect(history.location.pathname).toBe('/comidas/:id');
    expect(screen.queryByTestId('footer')).toBeNull();

    // verificando se o footer não possui na pagina de Detalhes de Bebidas
    history.push('/bebidas/:id');
    expect(history.location.pathname).toBe('/bebidas/:id');
    expect(screen.queryByTestId('footer')).toBeNull();

    // verificando se o footer não possui na pagina de Receitas de comidas em progresso
    history.push('/comidas/:id/in-progress');
    expect(history.location.pathname).toBe('/comidas/:id/in-progress');
    expect(screen.queryByTestId('footer')).toBeNull();

    // verificando se o footer não possui na pagina de Receitas de comidas em progresso
    history.push('/bebidas/:id/in-progress');
    expect(history.location.pathname).toBe('/bebidas/:id/in-progress');
    expect(screen.queryByTestId('footer')).toBeNull();

    // verificando se possui footer na pagina de Explorar
    history.push('/explorar');
    expect(history.location.pathname).toBe('/explorar');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se possui footer na pagina de Explorar Comidas
    history.push('/explorar/comidas');
    expect(history.location.pathname).toBe('/explorar/comidas');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se possui footer na pagina de Explorar Bebidas
    history.push('/explorar/bebidas');
    expect(history.location.pathname).toBe('/explorar/bebidas');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se possui footer na pagina de Explorar Comidas por ingredientes
    history.push('/explorar/comidas/ingredientes');
    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se possui footer na pagina de Explorar Bebidas por ingredientes
    history.push('/explorar/bebidas/ingredientes');
    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se possui footer na pagina de Explorar comidas por local
    history.push('/explorar/comidas/area');
    expect(history.location.pathname).toBe('/explorar/comidas/area');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se possui footer na pagina de Perfil
    history.push('/perfil');
    expect(history.location.pathname).toBe('/perfil');
    expect(screen.queryByTestId('footer')).toBeInTheDocument();

    // verificando se o footer não possui na pagina de Receitas favoritas
    history.push('/receitas-favoritas');
    expect(history.location.pathname).toBe('/receitas-favoritas');
    expect(screen.queryByTestId('footer')).toBeNull();

    // verificando se o footer não possui na pagina de Receitas feitas
    history.push('/receitas-feitas');
    expect(history.location.pathname).toBe('/receitas-feitas');
    expect(screen.queryByTestId('footer')).toBeNull();
  });
});

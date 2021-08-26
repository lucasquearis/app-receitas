import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../../App';

const perfilBtnID = 'profile-top-btn';
const pageTitleID = 'page-title';
const searchBtnId = 'search-top-btn';

const searchBarInputID = 'search-input';
const ingredientesRadioID = 'ingredient-search-radio';
const nameRadioID = 'name-search-radio';
const firstLetterRadioID = 'first-letter-search-radio';
const searchBarBtnID = 'exec-search-btn';

describe('Testes do componente Header na pagina de Comidas', () => {
  it('verifica se o header aparece na pagina de Comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const perfilFood = screen.getByTestId(perfilBtnID);
    const titleFood = screen.getByTestId(pageTitleID);
    const searchFood = screen.getByTestId(searchBtnId);

    expect(perfilFood).toBeDefined();
    expect(titleFood).toBeDefined();
    expect(searchFood).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Comidas, é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const perfilFood = screen.getByTestId(perfilBtnID);
    userEvent.click(perfilFood);
    const path = history.location.pathname;

    expect(path).toBe('/perfil');
  });

  it('verifa se o nome da pagina é "Comidas"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const titleFood = screen.getByTestId(pageTitleID);

    expect(titleFood.innerHTML).toBe('Comidas');
  });

  it('verifa se ao clicar no botão de pesquisa a barra de pesquisa aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const search = screen.getByTestId(searchBtnId);
    userEvent.click(search);

    const searchInput = screen.getByTestId(searchBarInputID);
    const ingredientesRadio = screen.getByTestId(ingredientesRadioID);
    const nameRadio = screen.getByTestId(nameRadioID);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioID);
    const searchBtn = screen.getByTestId(searchBarBtnID);

    expect(searchInput).toBeDefined();
    expect(ingredientesRadio).toBeDefined();
    expect(nameRadio).toBeDefined();
    expect(firstLetterRadio).toBeDefined();
    expect(searchBtn).toBeDefined();
  });
});

describe('Testes do componente Header na pagina de Bebidas', () => {
  it('verifica se o header aparece na pagina de Bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const perfilDrink = screen.getByTestId(perfilBtnID);
    const titleDrink = screen.getByTestId(pageTitleID);
    const searchDrink = screen.getByTestId(searchBtnId);

    expect(perfilDrink).toBeDefined();
    expect(titleDrink).toBeDefined();
    expect(searchDrink).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Bebidas, é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const perfilDrink = screen.getByTestId(perfilBtnID);
    userEvent.click(perfilDrink);
    const path = history.location.pathname;

    expect(path).toBe('/perfil');
  });

  it('verifa se o nome da pagina é "Bebidas"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const titleDrink = screen.getByTestId(pageTitleID);

    expect(titleDrink.innerHTML).toBe('Bebidas');
  });

  it('verifa se ao clicar no botão de pesquisa a barra de pesquisa aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const search = screen.getByTestId(searchBtnId);
    userEvent.click(search);

    const searchInput = screen.getByTestId(searchBarInputID);
    const ingredientesRadio = screen.getByTestId(ingredientesRadioID);
    const nameRadio = screen.getByTestId(nameRadioID);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioID);
    const searchBtn = screen.getByTestId(searchBarBtnID);

    expect(searchInput).toBeDefined();
    expect(ingredientesRadio).toBeDefined();
    expect(nameRadio).toBeDefined();
    expect(firstLetterRadio).toBeDefined();
    expect(searchBtn).toBeDefined();
  });
});

describe('Testes do componente Header na pagina de Explorar', () => {
  it('verifica se o header aparece na pagina de Explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const perfilExplore = screen.getByTestId(perfilBtnID);
    const titleExplore = screen.getByTestId(pageTitleID);

    expect(perfilExplore).toBeDefined();
    expect(titleExplore).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Explorar, é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const perfilExplore = screen.getByTestId(perfilBtnID);
    userEvent.click(perfilExplore);
    const path = history.location.pathname;

    expect(path).toBe('/perfil');
  });

  it('verifa se o nome da pagina é "Explorar"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const titleExplore = screen.getByTestId(pageTitleID);

    expect(titleExplore.innerHTML).toBe('Explorar');
  });
});

describe('Testes do componente Header na pagina de Explorar Comidas', () => {
  const page = '/explorar/comidas';
  it('verifica se o header aparece na pagina Explorar Comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilExploreFood = screen.getByTestId(perfilBtnID);
    const titleExploreFood = screen.getByTestId(pageTitleID);

    expect(perfilExploreFood).toBeDefined();
    expect(titleExploreFood).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Explorar Comidas, é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilExploreFood = screen.getByTestId(perfilBtnID);
    userEvent.click(perfilExploreFood);
    const path = history.location.pathname;

    expect(path).toBe('/perfil');
  });

  it('verifa se o nome da pagina é "Explorar Comidas"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const titleExploreFood = screen.getByTestId(pageTitleID);

    expect(titleExploreFood.innerHTML).toBe('Explorar Comidas');
  });
});

describe('Testes do componente Header na pagina de Explorar Bebidas', () => {
  const page = '/explorar/bebidas';
  it('verifica se o header aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilExploreDrinks = screen.getByTestId(perfilBtnID);
    const titleExploreDrinks = screen.getByTestId(pageTitleID);

    expect(perfilExploreDrinks).toBeDefined();
    expect(titleExploreDrinks).toBeDefined();
  });

  it('verifica se ao clicar no botão perfil em Explorar Bebidas, é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const perfilExploreDrinks = screen.getByTestId(perfilBtnID);
    userEvent.click(perfilExploreDrinks);
    const path = history.location.pathname;

    expect(path).toBe('/perfil');
  });

  it('verifa se o nome da pagina é "Explorar Bebidas"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(page);

    const titleExploreDrinks = screen.getByTestId(pageTitleID);

    expect(titleExploreDrinks.innerHTML).toBe('Explorar Bebidas');
  });
});

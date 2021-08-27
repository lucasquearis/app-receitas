import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ReceitasFeitas from '../pages/ReceitasFeitas';

jest.mock('clipboard-copy', () => jest.fn());
const copy = require('clipboard-copy');

describe('Testes para tela de receitas feitas', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'comida',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'bebida',
      area: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

  it('Verifica se todos os elementos estao presentes', () => {
    renderWithRouter(<ReceitasFeitas />);
    screen.getByTestId(/filter-by-all-btn/i);
    screen.getByTestId(/filter-by-food-btn/i);
    screen.getByTestId(/filter-by-drink-btn/i);
    screen.getByTestId(/0-horizontal-image/i);
    screen.getByTestId(/0-horizontal-top-text/i);
    screen.getByTestId(/0-horizontal-name/i);
    screen.getByTestId(/0-horizontal-done-date/i);
    screen.getByTestId(/0-horizontal-share-btn/i);
    screen.getByTestId(/0-Pasta-horizontal-tag/i);
    screen.getByTestId(/0-Curry-horizontal-tag/i);
    screen.getByTestId(/1-horizontal-image/i);
    screen.getByTestId(/1-horizontal-top-text/i);
    screen.getByTestId(/1-horizontal-name/i);
    screen.getByTestId(/1-horizontal-share-btn/i);
    screen.getByTestId(/1-horizontal-done-date/i);
  });

  it('Verifica se o botao de filtro food funciona', () => {
    renderWithRouter(<ReceitasFeitas />);

    const food = screen.getByTestId(/filter-by-food-btn/i);

    userEvent.click(food);
    expect(screen.getByTestId(/0-horizontal-name/i))
      .toHaveTextContent(doneRecipes[0].name);
    expect(screen.queryByTestId(/1-horizontal-name/i)).toBeNull();
  });

  it('Verifica se o botao de filtro drink funciona', () => {
    renderWithRouter(<ReceitasFeitas />);
    const drink = screen.getByTestId(/filter-by-drink-btn/i);

    userEvent.click(drink);
    expect(screen.getByTestId(/0-horizontal-name/i))
      .toHaveTextContent(doneRecipes[1].name);
    expect(screen.queryByTestId(/1-horizontal-name/i)).toBeNull();
  });

  it('Verifica se o botao de filtro all funciona', () => {
    renderWithRouter(<ReceitasFeitas />);
    const drink = screen.getByTestId(/filter-by-drink-btn/i);
    const all = screen.getByTestId(/filter-by-all-btn/i);

    userEvent.click(drink);
    expect(screen.getByTestId(/0-horizontal-name/i))
      .toHaveTextContent(doneRecipes[1].name);
    expect(screen.queryByTestId(/1-horizontal-name/i)).toBeNull();

    userEvent.click(all);
    expect(screen.getByTestId(/0-horizontal-name/i))
      .toHaveTextContent(doneRecipes[0].name);
    expect(screen.getByTestId(/1-horizontal-name/i))
      .toHaveTextContent(doneRecipes[1].name);
  });

  it('Verifica se clicar na imagem da receita, vai ate os detalhes dela', () => {
    const { history } = renderWithRouter(<ReceitasFeitas />);
    const imagem = screen.getByTestId(/0-horizontal-image/i);

    userEvent.click(imagem);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52771');
  });

  it('Verifica se clicar no nome da receita, vai ate os detalhes dela', () => {
    const { history } = renderWithRouter(<ReceitasFeitas />);
    const nome = screen.getByTestId(/0-horizontal-name/i);

    userEvent.click(nome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas/52771');
  });

  it('Verifica se o botao de compartilhar copia o link da receita', () => {
    renderWithRouter(<ReceitasFeitas />);
    copy.mockImplementation(() => null);
    const copyLink = screen.getByTestId(/0-horizontal-share-btn/i);

    userEvent.click(copyLink);

    expect(copy).toHaveBeenCalled();
  });

  it('Verifica se caso nao tenha receitas feitas, nao renderiza os cartoes', () => {
    localStorage.clear();
    renderWithRouter(<ReceitasFeitas />);
    const imagem = screen.queryByTestId(/0-horizontal-image/i);

    expect(imagem).toBeNull();
  });
});

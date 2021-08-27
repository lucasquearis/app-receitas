import React from 'react';
import { screen, fireEvent, history } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import RecipesDone from '../pages/RecipesDone';
import recipesDoneMock from '../data/recipesDoneMock';

describe('Testa presença de todos elementos da tela', () => {
  beforeEach(() => {
    renderWithRouter(<RecipesDone />);
  });

  it('Busca pelos botões de filtros', () => {
    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();

    const foodButton = screen.getByTestId('filter-by-food-btn');
    expect(foodButton).toBeInTheDocument();

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkButton).toBeInTheDocument();
  });

  it('busca pelos elementos dos cards de comida', () => {
    const cardImage = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[0])}-horizontal-image`);
    expect(cardImage).toBeInTheDocument();

    const cardCategory = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[0])}-horizontal-top-text`);
    expect(cardCategory).toBeInTheDocument();

    const cardName = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[0])}-horizontal-name`);
    expect(cardName).toBeInTheDocument();

    const cardDoneDate = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[0])}-horizontal-done-date`);
    expect(cardDoneDate).toBeInTheDocument();

    const cardShare = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[0])}-horizontal-share-btn`);
    expect(cardShare).toBeInTheDocument();

    const cardTagName = screen
      .getByTestId(`${recipesDoneMock
        .indexOf(recipesDoneMock[0])}-${recipesDoneMock[0].tags[0]}-horizontal-tag`);
    expect(cardTagName).toBeInTheDocument();
  });

  it('busca pelos elementos dos cards de bebida', () => {
    const cardImage = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[1])}-horizontal-image`);
    expect(cardImage).toBeInTheDocument();

    const cardCategory = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[1])}-horizontal-top-text`);
    expect(cardCategory).toBeInTheDocument();

    const cardName = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[1])}-horizontal-name`);
    expect(cardName).toBeInTheDocument();

    const cardDoneDate = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[1])}-horizontal-done-date`);
    expect(cardDoneDate).toBeInTheDocument();

    const cardShare = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[1])}-horizontal-share-btn`);
    expect(cardShare).toBeInTheDocument();

    const cardAlcoholic = screen
      .getByTestId(`${recipesDoneMock.indexOf(recipesDoneMock[1])}-horizontal-top-text`);
    expect(cardAlcoholic).toBeInTheDocument();
  });
});

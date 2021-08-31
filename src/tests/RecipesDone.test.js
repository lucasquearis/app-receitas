import React from 'react';
import { screen, fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import RecipesDone from '../pages/RecipesDone';

const indexRecipeMeal = recipesDoneMock.indexOf(recipesDoneMock[0]);
const indexRecipeDrink = recipesDoneMock.indexOf(recipesDoneMock[1]);

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
      .getByTestId(`${indexRecipeMeal}-horizontal-image`);
    expect(cardImage).toBeInTheDocument();

    const cardCategory = screen
      .getByTestId(`${indexRecipeMeal}-horizontal-top-text`);
    expect(cardCategory).toBeInTheDocument();

    const cardName = screen
      .getByTestId(`${indexRecipeMeal}-horizontal-name`);
    expect(cardName).toBeInTheDocument();

    const cardDoneDate = screen
      .getByTestId(`${indexRecipeMeal}-horizontal-done-date`);
    expect(cardDoneDate).toBeInTheDocument();

    const cardShare = screen
      .getByTestId(`${indexRecipeMeal}-horizontal-share-btn`);
    expect(cardShare).toBeInTheDocument();

    const cardTagName = screen
      .getByTestId(`${recipesDoneMock
        .indexOf(recipesDoneMock[0])}-${recipesDoneMock[0].tags[0]}-horizontal-tag`);
    expect(cardTagName).toBeInTheDocument();
  });

  it('busca pelos elementos dos cards de bebida', () => {
    const cardImage = screen
      .getByTestId(`${indexRecipeDrink}-horizontal-image`);
    expect(cardImage).toBeInTheDocument();

    const cardCategory = screen
      .getByTestId(`${indexRecipeDrink}-horizontal-top-text`);
    expect(cardCategory).toBeInTheDocument();

    const cardName = screen
      .getByTestId(`${indexRecipeDrink}-horizontal-name`);
    expect(cardName).toBeInTheDocument();

    const cardDoneDate = screen
      .getByTestId(`${indexRecipeDrink}-horizontal-done-date`);
    expect(cardDoneDate).toBeInTheDocument();

    const cardShare = screen
      .getByTestId(`${indexRecipeDrink}-horizontal-share-btn`);
    expect(cardShare).toBeInTheDocument();

    const cardAlcoholic = screen
      .getByTestId(`${indexRecipeDrink}-horizontal-top-text`);
    expect(cardAlcoholic).toBeInTheDocument();
  });
});

// describe('Testa funcionamento do clipboard-copy', () => {

// });

describe('Testa funcionamento dos botões de filtro', () => {
  beforeEach(() => {
    renderWithRouter(<RecipesDone />);
  });

  it('Filtro para comidas', () => {
    const cardFood = screen.getByTestId(`${recipesDoneMock[0].id}-recipe-card`);
    expect(cardFood).toBeInTheDocument();

    const cardDrink = screen.getByTestId(`${recipesDoneMock[1].id}-recipe-card`);
    expect(cardDrink).toBeInTheDocument();

    const foodButton = screen.getByTestId('filter-by-food-btn');
    fireEvent.click(foodButton);

    expect(cardFood).toBeInTheDocument();
    expect(cardDrink).not.toBeInTheDocument();
  });

  it('botão para filtrar bebidas', () => {
    const cardFood = screen.getByTestId(`${recipesDoneMock[0].id}-recipe-card`);
    expect(cardFood).toBeInTheDocument();

    const cardDrink = screen.getByTestId(`${recipesDoneMock[1].id}-recipe-card`);
    expect(cardDrink).toBeInTheDocument();

    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(drinkButton);

    expect(cardFood).not.toBeInTheDocument();
    expect(cardDrink).toBeInTheDocument();
  });

  // it('botão para desfazer filtros', () => {

  // });

  // it('Testa redirecionameto ao clicar em cards', () => {

  // });
});

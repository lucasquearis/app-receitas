import React from 'react';
import { screen } from '@testing-library/react';
import BottomMenu from '../components/BottomMenu';
import DoneRecipes from '../pages/DoneRecipes';
import DrinkProcess from '../pages/DrinkProgress';
import DrinkRecipeDetails from '../pages/DrinkRecipeDetails';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreDrinksByIngredient from '../pages/ExploreDrinksByIngredient';
import ExploreMeals from '../pages/ExploreMeals';
import ExploreMealsByIngredient from '../pages/ExploreMealsByIngredient';
import ExploreMealsByOrigin from '../pages/ExploreMealsByOrigin';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Login from '../pages/Login';
import MealProcess from '../pages/MealProgress';
import MealRecipeDetails from '../pages/MealRecipeDetails';
import Meals from '../pages/Meals';
import Profile from '../pages/Profile';
import renderWithRouter from './renderWithRouter';

describe('[19] Verifica a implementação dos elementos no menu inferior', () => {
  test('O atributo do menu inferior deve ser footer', () => {
    renderWithRouter(<BottomMenu />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Verifica se existe o elemento de bebidas', () => {
    renderWithRouter(<BottomMenu />);
    const footer = screen.getByTestId('drinks-bottom-btn');
    expect(footer).toBeInTheDocument();
  });
  test('Verifica se existe o elemento de comidas', () => {
    renderWithRouter(<BottomMenu />);
    const footer = screen.getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
  });
  test('Verifica se existe o elemento de explorar', () => {
    renderWithRouter(<BottomMenu />);
    const footer = screen.getByTestId('explore-bottom-btn');
    expect(footer).toBeInTheDocument();
  });
});

describe('[20] Verifica se o menu inferior possui ícones', () => {
  test('Verifica se o menu inferior apresenta 3 ícones', () => {
    renderWithRouter(<BottomMenu />);
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    const mealsBtn = screen.getByTestId('food-bottom-btn');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(exploreBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
});

describe('[21] Verifica se o menu inferior é exibido nas páginas corretas', () => {
  test('Não tem footer na tela de login', () => {
    renderWithRouter(<Login />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
  test('Tem footer na tela de principal de receitas de comidas', () => {
    renderWithRouter(<Meals />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Tem footer na tela de principal de receitas de bebidas', () => {
    renderWithRouter(<Drinks />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Não tem footer na tela de detalhes de uma receita de comida', () => {
    renderWithRouter(<MealRecipeDetails />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
  test('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    renderWithRouter(<DrinkRecipeDetails />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
  test('Não tem footer na tela de receita em processo de comida', () => {
    renderWithRouter(<MealProcess />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
  test('Não tem footer na tela de receita em processo de bebida', () => {
    renderWithRouter(<DrinkProcess />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
  test('Tem footer na tela de explorar', () => {
    renderWithRouter(<Explore />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Tem footer na tela de explorar comidas', () => {
    renderWithRouter(<ExploreMeals />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Tem footer na tela de explorar bebidas', () => {
    renderWithRouter(<ExploreDrinks />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Tem footer na tela de explorar comidas por ingrediente', () => {
    renderWithRouter(<ExploreMealsByIngredient />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Tem footer na tela de explorar bebidas por ingrediente', () => {
    renderWithRouter(<ExploreDrinksByIngredient />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Tem footer na tela de explorar comidas por local de origem', () => {
    renderWithRouter(<ExploreMealsByOrigin />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Tem footer na tela de perfil', () => {
    renderWithRouter(<Profile />);
    const footer = screen.queryByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  test('Não tem footer na tela de receitas feitas', () => {
    renderWithRouter(<DoneRecipes />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
  test('Não tem footer na tela de receitas favoritas', () => {
    renderWithRouter(<FavoriteRecipes />);
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
});

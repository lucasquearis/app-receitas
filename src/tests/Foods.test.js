import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import mockMeals from './mocks/mockMeals';
import App from '../App';

const mock = async (url) => ({
  json: async () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return mockMeals;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return mockCategories;
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
      return mockCategory;
    }
  },
});

const categories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

describe('Testa página principal de comidas', () => {
  test('Testa botões de filtro por categoria', () => {
    global.fetch = jest.fn(mock);
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    categories.forEach((category) => {
      expect(screen.getByRole('button', { value: category })).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button', { value: 'Beef' }));
    expect(screen.getByAltText(/Beef and Mustard Pie/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { value: 'Beef' }));
    expect(screen.getByAltText(/Beef and Mustard Pie/i)).not.toBeInTheDocument();

    // userEvent.click(screen.getByRole('button', { value: 'Beef' }));
    // expect(screen.getByTestId('0-card-name').textContent)
    //   .not.toBe('Beef and Mustard Pie');
  });

  test('Testa elementos do card', () => {
    userEvent.click(screen.getByTestId('All-category-filter'));
    expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();

    expect(screen.getByTestId('1-card-img'))
      .toHaveAttribute('src', mockMeals[1].strMealThumb);

    expect(screen.getByTestId('1-card-name').textContent)
      .toBe(mockMeals[1].strMeal);
  });

  test('Testa se os cards corretos estão sendo renderizados', () => {
    userEvent.click(screen.getByTestId('All-category-filter'));
    mockMeals.forEach(({ strMeal }) => {
      expect(screen.getByText(strMeal)).toBeInTheDocument();
    });
  });

  test('Testa redirecionamento para a página de detalhes da receita', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText('Corba'));

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52977');
  });
});

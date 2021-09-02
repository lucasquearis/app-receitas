import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
// import mockMealsCategories from './mocks/mockMealsCategories';
import mockMeals from './mocks/mockMeals';
import App from '../App';
// import FoodsAndDrinks from '../Pages/FoodsAndDrinks';

// beforeEach(() => renderWithRouter(<App />));

// afterEach(() => jest.clearAllMocks());

// const mock = async (url) => ({
//   json: async () => {
//     if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
//       return meals;
//     }
//     if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
//       return mockMealsCategories;
//     }
//     // if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
//     //   return mealsByIngredient;
//     // }
//   },
// });

// jest.spyOn(global, 'fetch');

// global.fetch = jest.fn(mock);

// jest
//   .spyOn(requestMenu, 'mockMealsCategories')
//   .mockImplementation(() => Promise.resolve(mockMealsCategories));

// global.fetch = jest.fn(async () => ({
//   json: async () => mockMealsCategories,
// }));

// const categories = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

describe('Testa página principal de comidas', () => {
  // test('Testa botões de filtro por categoria', async () => {
  //   // global.fetch = jest.fn(mock);

  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mockMealsCategories),
  //   });
  //   // const { history } = renderWithRouter(<App />);
  //   // history.push('/comidas');

  //   // categories.forEach((category) => {
  //   //   expect(screen.getByRole('button', { value: category })).toBeInTheDocument();
  //   // });

  //   // userEvent.click(screen.getByRole('button', { value: 'Beef' }));
  //   // expect(screen.getByAltText(/Beef and Mustard Pie/i)).toBeInTheDocument();

  //   // userEvent.click(screen.getByRole('button', { value: 'Beef' }));
  //   // expect(screen.getByAltText(/Beef and Mustard Pie/i)).not.toBeInTheDocument();

  //   // userEvent.click(screen.getByRole('button', { value: 'Beef' }));
  //   // expect(screen.getByTestId('0-card-name').textContent)
  //   //   .not.toBe('Beef and Mustard Pie');
  // });

  test('Testa elementos do card', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMeals),
    });

    userEvent.click(await screen.getByTestId('All-category-filter'));
    expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();

    expect(await screen.getByTestId('1-card-img'))
      .toHaveAttribute('src', mockMeals[1].strMealThumb);

    expect(await screen.getByTestId('1-card-name').textContent)
      .toBe(mockMeals[1].strMeal);
  });

  // test('Testa se os cards corretos estão sendo renderizados', () => {
  //   userEvent.click(screen.getByTestId('All-category-filter'));
  //   mockMeals.forEach(({ strMeal }) => {
  //     expect(screen.getByText(strMeal)).toBeInTheDocument();
  //   });
  // });

  // test('Testa redirecionamento para a página de detalhes da receita', () => {
  //   const { history } = renderWithRouter(<App />);
  //   userEvent.click(screen.getByText('Corba'));

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/comidas/52977');
  // });
});

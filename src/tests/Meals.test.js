// import React from 'react';
// import userEvent from '@testing-library/user-event';
// import { screen, fireEvent } from '@testing-library/dom';

// import renderWithRouter from '../renderWithRouter';
// import Meals from '../pages/Meals';
// import mealMock from './mealMock';

// describe('Testa tela Meals', () => {
//   beforeAll(mealMock);

//   it('Verifica se existem 12 cards de comida na tela', () => {
//     renderWithRouter(<Meals />);

//     const mokeMeal = {
//       idMeal: '52977',
//       strMeal: 'Corba',
//       strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//     };

//     const mealCardName = screen.getByText(mokeMeal.strMeal);
//     const mealCardThumb = screen.getByText(mokeMeal.strMealThumb);

//     const DOZE = 12;
//     for (let index = 0; index < DOZE; index += 1) {
//       const mealCard = screen.findByTestId(`${index}-recipe-card`);
//       expect(mealCard).toBeInTheDocument();
//     }

//     expect(mealCardName).toBeInTheDocument();
//     expect(mealCardThumb).toBeInTheDocument();
//   });

//   it('Verifica se existem 5 botões na tela', async () => {
//     renderWithRouter(<Meals />);
//     const button = await screen.findByRole('button', { name: 'Beef' });
//     expect(button).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

// const ingredientsObj = {
//   idMeal: '52940',
//   strMeal: 'Brown Stew Chicken',
//   strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
// };

// const nameObj = {
//   dateModified: null,
//   idMeal: '52795',
//   strArea: 'Indian',
//   strCategory: 'Chicken',
//   strIngredient1: 'Chicken',
//   strIngredient2: 'Onion',
//   strIngredient3: 'Tomatoes',
//   strIngredient4: 'Garlic',
//   strIngredient5: 'Ginger paste',
//   strIngredient6: 'Vegetable oil',
//   strIngredient7: 'Cumin seeds',
//   strIngredient8: 'Coriander seeds',
//   strIngredient9: 'Turmeric powder',
//   strIngredient10: 'Chilli powder',
//   strIngredient11: 'Green chilli',
//   strIngredient12: 'Yogurt',
//   strIngredient13: 'Cream',
//   strIngredient14: 'fenugreek',
//   strIngredient15: 'Garam masala',
//   strIngredient16: 'Salt',
//   strMeal: 'Chicken Handi',
//   strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
//   strMeasure1: '1.2 kg',
//   strMeasure2: '5 thinly sliced',
//   strMeasure3: '2 finely chopped',
//   strMeasure4: '8 cloves chopped',
//   strMeasure5: '1 tbsp',
//   strMeasure6: '¼ cup',
//   strMeasure7: '2 tsp',
//   strMeasure8: '3 tsp',
//   strMeasure9: '1 tsp',
//   strMeasure10: '1 tsp',
//   strMeasure11: '2',
//   strMeasure12: '1 cup',
//   strMeasure13: '¾ cup',
//   strMeasure14: '3 tsp Dried',
//   strMeasure15: '1 tsp',
//   strMeasure16: 'To taste',
//   strYoutube: 'https://www.youtube.com/watch?v=IO0issT0Rmc',
// };

// const firstLetterObj = {
//   idMeal: ',52776',
//   strArea: ',French',
//   strCategory: ',Dessert',
//   strIngredient1: ',Plain chocolate',
//   strIngredient2: ',Butter',
//   strIngredient3: ',Milk',
//   strIngredient4: ',Eggs',
//   strIngredient5: ',Granulated Sugar',
//   strIngredient6: ',Flour',
//   strMeal: ',Chocolate Gateau',
//   strMealThumb: ',https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg',
//   strMeasure1: ',250g',
//   strMeasure2: ',175g',
//   strMeasure3: ',2 tablespoons',
//   strMeasure4: ',5',
//   strMeasure5: ',175g',
//   strMeasure6: ',125g',
//   strSource: ',http://www.goodtoknow.co.uk/recipes/536028/chocolate-gateau',
//   strTags: ',Cake,Chocolate,Desert,Pudding',
//   strYoutube: ',https://www.youtube.com/watch?v=dsJtgmAhFF4',
// };

// const apiResponseIngredients = Promise.resolve({
//   json: () => Promise.resolve(ingredientsObj),
//   ok: true,
// });

// const apiResponseName = Promise.resolve({
//   json: () => Promise.resolve(nameObj),
//   ok: true,
// });

// const apiResponseFirstLetter = Promise.resolve({
//   json: () => Promise.resolve(firstLetterObj),
//   ok: true,
// });

// const mockedExchangeIngredients = jest.spyOn(global, 'fetch')
//   .mockImplementation(() => apiResponseIngredients);

// const mockedExchangeName = jest.spyOn(global, 'fetch')
//   .mockImplementation(() => apiResponseName);

// const mockedExchangeFirstLetter = jest.spyOn(global, 'fetch')
//   .mockImplementation(() => apiResponseFirstLetter);

describe('13) Implemente os elementos da barra de busca respeitando os atributos', () => {
  it('O input de busca deve estar no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('search-input')).toBeInTheDocument();
  });
  it('O radio button de busca de ingrediente está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('ingredient-search-radio')).toBeInTheDocument();
  });
  it('O radio button de busca por nome está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('name-search-radio')).toBeInTheDocument();
  });
  it('O radio button de busca da primeira letra está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('first-letter-search-radio')).toBeInTheDocument();
  });
  it('O botão de busca está no documento', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findByTestId('exec-search-btn')).toBeInTheDocument();
  });
});

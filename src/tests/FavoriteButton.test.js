import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteButton from '../components/FavoriteButton';

const FAVS = [{ id: '52971', type: 'comida', area: 'Tunisian', category: 'Vegetarian', alcoholicOrNot: '', name: 'Kafteji', image: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg' }, { id: '52977', type: 'comida', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }, { id: '15288', type: 'bebida', area: '', category: 'Shot', alcoholicOrNot: 'Alcoholic', name: '252', image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg' }];
const blackHeart = '../images/blackHeartIcon.svg';
const whiteHeart = '../images/whiteHeartIcon.svg';

describe('sdf', () => {
  it('testa cor do heart', async () => {
    await act(async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(FAVS));
      renderWithRouter(<FavoriteButton />);
    });
    const favBtn = await screen.findByRole('button', { src: blackHeart });
    userEvent.click(favBtn);
    await screen.findByRole('button', { src: whiteHeart });
  });
});

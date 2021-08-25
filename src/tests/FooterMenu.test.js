import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
import FooterMenu from '../components/FooterMenu';

const FOOTER = 'footer';
const EXPLORE_BOTTOM_BTN = 'explore-bottom-btn';
const FOOD_BOTTOM_BTN = 'food-bottom-btn';

describe('Teste o componente <FooterMenu.js />', () => {
  it('1- Teste se a página contém um footer', () => {
    renderWithRouter(<FooterMenu />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  describe('Testa os datests-ids do <FooterMenu />', () => {
    it('1- O menu inferior deve possuir o atributo `data-testid="footer"`', () => {
      renderWithRouter(<FooterMenu />);
      expect(screen.getByTestId(FOOTER)).toBeInTheDocument();
    });
    it('2- O elemento para a página drinks tem `data-testid="explore-bottom-btn"', () => {
      renderWithRouter(<FooterMenu />);
      expect(screen.getByTestId(EXPLORE_BOTTOM_BTN)).toBeInTheDocument();
    });
    it('2- O elemento para a página comidas tem `data-testid="food-bottom-btn"', () => {
      renderWithRouter(<FooterMenu />);
      expect(screen.getByTestId(FOOD_BOTTOM_BTN)).toBeInTheDocument();
      // expect(screen.getByRole('button')).toBeInTheDocument();
      // expect(screen.getByText('Explore')).toBeInTheDocument();
      // expect(screen.getByText('Food')).toBeInTheDocument();
    });
  });
});

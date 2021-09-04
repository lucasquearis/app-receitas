import React from 'react';
import { Link } from 'react-router-dom';
import './componentCSS/BottomMenu.css';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import profileIcon from '../images/profileIcon.svg';

export default function BottomMenu() {
  const renderIconLink = (target, icon, alt, dataTestId) => (
    <Link to={ target }>
      <img src={ icon } alt={ alt } data-testid={ dataTestId } />
    </Link>
  );

  return (
    <footer data-testid="footer" className="footer__navigation">
      {renderIconLink('/explorar', exploreIcon, 'Ícone Explorar', 'explore-bottom-btn')}
      {renderIconLink('/comidas', mealIcon, 'Ícone de Comidas', 'food-bottom-btn')}
      {renderIconLink('/bebidas', drinkIcon, 'Ícone de Bebidas', 'drinks-bottom-btn')}
      {renderIconLink('/perfil', profileIcon, 'Ícone Perfil')}
    </footer>
  );
}

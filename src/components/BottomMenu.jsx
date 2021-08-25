import React from 'react';
import { Link } from 'react-router-dom';
import './componentCSS/BottomMenu.css';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import profileIcon from '../images/profileIcon.svg';

// prettier-ignore
export default function BottomMenu() {
  const renderIconLink = (target, icon, alt) => (
    <Link to={ target }>
      <img src={ icon } alt={ alt } />
    </Link>
  );

  return (
    <footer data-testid="footer" className="footer__navigation">
      {renderIconLink('/explorar', exploreIcon, 'Ícone Explorar')}
      {renderIconLink('/comidas', mealIcon, 'Ícone Comidas')}
      {renderIconLink('/bebidas', drinkIcon, 'Ícone Bebidas')}
      {renderIconLink('/perfil', profileIcon, 'Ícone Perfil')}
    </footer>
  );
}

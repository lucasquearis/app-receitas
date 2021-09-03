import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.png';
import mealIcon from '../images/mealIcon.png';
import drinkIcon from '../images/drinkIcon.png';

export default function BottomMenu() {
  const renderIconLink = (target, icon, alt, dataTestId) => (
    <Link to={ target }>
      <img src={ icon } alt={ alt } data-testid={ dataTestId } />
    </Link>
  );

  return (
    <footer data-testid="footer" className="footer__navigation">
      <div className="footer__bottom-menu-icon-div">
        {renderIconLink('/comidas', mealIcon, 'Ícone de Comidas', 'food-bottom-btn')}
        {renderIconLink('/explorar', exploreIcon, 'Ícone Explorar', 'explore-bottom-btn')}
        {renderIconLink('/bebidas', drinkIcon, 'Ícone de Bebidas', 'drinks-bottom-btn')}
      </div>
    </footer>
  );
}

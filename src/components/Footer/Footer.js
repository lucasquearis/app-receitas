import React from 'react';

import FooterButton from './FooterButton';
import './footer.css';
import { exploreIcon, mealIcon, drinkIcon } from '../../common/svgStore';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <FooterButton
        src={ drinkIcon }
        alt="Ícone Bebidas"
        data-testid="drinks-bottom-btn"
        path="/bebidas"
      />
      <FooterButton
        src={ exploreIcon }
        alt="Ícone Explorar"
        data-testid="explore-bottom-btn"
        path="/explorar"
      />
      <FooterButton
        src={ mealIcon }
        alt="Ícone Comidas"
        data-testid="food-bottom-btn"
        path="/comidas"
      />
    </footer>
  );
}

export default Footer;

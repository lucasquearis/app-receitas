import React from 'react';
import '../cssPages/Footer.css';
import { Link, useLocation } from 'react-router-dom';
import iconeDrinks from '../images/drinkIcon.svg';
import iconeExplorar from '../images/exploreIcon.svg';
import iconeComida from '../images/mealIcon.svg';

function Footer() {
  const styles = {
    0: 'neutralStyle',
    1: 'drinkStyle',
    2: 'foodStyle',
  };
  const path = Number((useLocation().pathname).includes('bebidas'))
  + 2 * Number((useLocation().pathname).includes('comidas'));

  return (
    <footer data-testid="footer" className={ `footer ${styles[path]}` }>
      <Link to="/bebidas">
        <img
          src={ iconeDrinks }
          alt="bebidas"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ iconeExplorar }
          alt="explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ iconeComida }
          alt="bebidas"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;

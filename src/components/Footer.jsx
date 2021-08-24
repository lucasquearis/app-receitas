import React from 'react';
import '../cssPages/Footer.css';
import { Link } from 'react-router-dom';
import iconeDrinks from '../images/drinkIcon.svg';
import iconeExplorar from '../images/exploreIcon.svg';
import iconeComida from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
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

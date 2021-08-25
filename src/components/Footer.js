import React from 'react';
import '../Footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer-style" data-testid="footer">
      <Link to="/bebidas">
        <img
          alt="bebidas"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          alt="explorar"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          alt="comidas"
          src={ mealIcon }
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;

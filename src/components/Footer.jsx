import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer
      data-testid="footer"
    >
      <Link to="bebidas">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drinks" />
      </Link>
      <Link to="explorar">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="explore" />
      </Link>
      <Link to="comidas">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="food" />
      </Link>
    </footer>
  );
}

export default Footer;

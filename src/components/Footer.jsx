import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <img
          alt="Drinks Icon"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/explorar">
        <img
          alt="Explore Icon"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
        />
      </Link>

      <Link to="/comidas">
        <img
          alt="Meals Icon"
          src={ mealIcon }
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

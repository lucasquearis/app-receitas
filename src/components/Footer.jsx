import React from 'react';
// import '../CSS/Footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer
      className="d-flex navbar fixed-bottom justify-content-around bg-color"
      data-testid="footer"
    >
      <Link to="/bebidas">
        <img
          name="drinks-botton"
          className="drinks-botton"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinks-button"
        />
      </Link>
      <Link to="/explorar">
        <img
          name="explore-bottom"
          className="explore-botton"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore-button"
        />
      </Link>
      <Link to="/comidas">
        <img
          name="food-bottom"
          className="food-botton"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="food-button"
        />
      </Link>
    </footer>
  );
}

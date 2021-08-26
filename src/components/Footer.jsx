import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas">
        <button type="button" className="buttons">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" className="buttons">
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button" className="buttons">
          <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;

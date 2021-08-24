import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/" data-testid="drinks-bottom-btn">
        { drinkIcon }
      </Link>
      <Link to="/" data-testid="explore-bottom-btn">
        { exploreIcon }
      </Link>
      <Link to="/" data-testid="food-bottom-btn">
        { mealIcon }
      </Link>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="app-footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="icone bebidas" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="icone bebidas" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="icone bebidas" />
      </Link>
    </footer>
  );
}

export default Footer;

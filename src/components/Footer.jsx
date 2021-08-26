import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer data-testid="footer">
        <div className="icons">
          <Link to="/bebidas" data-testid="icone-bebida">
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks-bottom" />
          </Link>
          <Link to="/explorar" data-testid="icone-explorar">
            <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
          </Link>
          <Link to="/comidas" data-testid="icone-comida">
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

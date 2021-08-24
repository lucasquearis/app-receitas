import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './css/Footer.css';

const Footer = () => (
  <footer className="footer" data-testid="footer">
    <Link to="/bebidas">
  
      <input
        data-testid="drinks-bottom-btn"
        alt="bebidas"
        type="image"
        src={ drinkIcon }
      />
    </Link>
    <Link to="/explorar">
    
      <input
        data-testid="explore-bottom-btn"
        alt="explorar"
        type="image"
        src={ exploreIcon }
      />
    </Link>
    <Link to="/comidas">
     
      <input
        data-testid="food-bottom-btn"
        alt="comida"
        type="image"
        src={ mealIcon }
      />
    </Link>
  </footer>
);

export default Footer;

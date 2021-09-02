import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

function Footer() {
  return (
    <footer
      style={ {
        position: 'fixed',
        bottom: '0',
      } }
      data-testid="footer"
      className="footer-links"
    >
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Icone de Bebidas"
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Icone de Exploração"
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Icone de Comidas"
        />
      </Link>
    </footer>
  );
}

export default Footer;

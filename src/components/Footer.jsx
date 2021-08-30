import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer">

      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="imagem-drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="imagem-explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>

      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="imagem-comida"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

import React from 'react';
import './foother.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function MenuInferior() {
  return (
    <div className="main">
      <footer className="barra-de-navegacao" data-testid="footer">
        <div className="foother">
          <Link
            to="/bebidas"
            className="img-link"
            type="button"
            data-testid="drinks-bottom-btn"
          >
            <img className="img" data-testid="footer" src={ drinkIcon } alt="bebidas" />
          </Link>

          <Link
            to="explorar"
            className="img-link"
            data-testid="explore-bottom-btn"
          >
            <img src={ exploreIcon } alt="explorar" />
          </Link>

          <Link
            to="/comidas"
            className="img-link"
            type="button"
            data-testid="food-bottom-btn"
          >
            <img src={ mealIcon } alt="comidas" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

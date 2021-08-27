import React from 'react';
import './foother.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function MenuInferior() {
  return (
    <div className="main">
      <footer className="foother" data-testid="footer">
        <div className="barra-de-navegacao">
          <Link
            to="/bebidas"
            className="img-link"
            type="button"            
          >
            <img
              className="img"
              src={ drinkIcon }
              data-testid="drinks-bottom-btn"
              alt="bebidas"
            />
          </Link>

          <Link
            to="explorar"
            className="img-link"
          >
            <img src={ exploreIcon } alt="explorar" data-testid="explore-bottom-btn" />
          </Link>

          <Link
            to="/comidas"
            className="img-link"
            type="button"            
          >
            <img src={ mealIcon } alt="comidas" data-testid="food-bottom-btn" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

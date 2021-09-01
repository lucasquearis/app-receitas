import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function MenuInferior() {
  return (
    <div className="main">
      <footer className="barra-de-navegacao">
        <div className="foother" data-testid="footer">
          <Link
            to="/bebidas"
            className="img-link"
            type="button"
            // data-testid="drinks-bottom-btn"
          >
            <img
              className="img"
              src={ drinkIcon }
              data-testid="drinks-bottom-btn"
              alt="bebidas"
            />
          </Link>

          <Link
            to="/explorar"
            className="img-link"
            // data-testid="explore-bottom-btn"
          >
            <img src={ exploreIcon } alt="explorar" data-testid="explore-bottom-btn" />
          </Link>

          <Link
            to="/comidas"
            className="img-link"
            type="button"
            // data-testid="food-bottom-btn"
          >
            <img src={ mealIcon } alt="comidas" data-testid="food-bottom-btn" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

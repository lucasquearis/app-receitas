import React from 'react';
import { Link } from 'react-router-dom';
import iconDrink from '../images/drinkIcon.svg';
import iconExplore from '../images/exploreIcon.svg';
import iconFood from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <div>
        <Link to="/bebidas">
          <button type="button" data-testid="drinks-bottom-btn" src={ iconDrink }>
            <img
              src={ iconDrink }
              alt="icone de bebida"
              width="15px"
              height="15px"
            />
          </button>
        </Link>
        <Link to="/explorar">
          <button
            type="button"
            data-testid="explore-bottom-btn"
            src={ iconExplore }
          >
            <img
              src={ iconExplore }
              alt="Icone de explorar"
              width="15px"
              height="15px"
            />
          </button>
        </Link>
        <Link to="/comidas">
          <button
            type="button"
            data-testid="food-bottom-btn"
            src={ iconFood }
          >
            <img
              src={ iconFood }
              alt="Icone de comida"
              width="15px"
              height="15px"
            />
          </button>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;

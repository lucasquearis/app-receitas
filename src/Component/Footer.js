import React from 'react';
import { Link } from 'react-router-dom';
import iconDrink from '../images/drinkIcon.svg';
import iconExplore from '../images/exploreIcon.svg';
import iconFood from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <div className="footer">
        <Link to="/bebidas">
          <button
            className="footer-buttons"
            type="button"
            data-testid="drinks-bottom-btn"
            src={ iconDrink }
          >
            <img
              className="footer-icon"
              src={ iconDrink }
              alt="icone de bebida"
            />
          </button>
        </Link>
        <Link to="/explorar">
          <button
            className="footer-buttons"
            type="button"
            data-testid="explore-bottom-btn"
            src={ iconExplore }
          >
            <img
              className="footer-icon"
              src={ iconExplore }
              alt="Icone de explorar"
            />
          </button>
        </Link>
        <Link to="/comidas">
          <button
            className="footer-buttons"
            type="button"
            data-testid="food-bottom-btn"
            src={ iconFood }
          >
            <img
              className="footer-icon"
              src={ iconFood }
              alt="Icone de comida"
            />
          </button>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';
import explore from '../images/exploreIcon.svg';
import './style/footerMenu.css';

export default function MenuFooter() {
  return (
    <div>
      <footer data-testid="footer" className="footer">
        <Link to="/bebidas">
          <img
            data-testid="drinks-bottom-btn"
            src={ drink }
            alt="icon drink"
          />
        </Link>

        <Link to="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ explore }
            alt="icon explore"
          />
        </Link>

        <Link to="/comidas">
          <img
            data-testid="food-bottom-btn"
            src={ food }
            alt="icon food"
          />
        </Link>
      </footer>
    </div>
  );
}

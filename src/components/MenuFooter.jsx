import React from 'react';
import { Link } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import food from '../images/mealIcon.svg';
import explore from '../images/exploreIcon.svg';
import './style/footerMenu.css';

export default function MenuFooter() {
  return (
    <div className="footerMenu">
      <footer data-testid="footer">
        <Link to="/bebidas" className="fixed">
          <img data-testid="drinks-bottom-btn" src={ drink } alt="icon drink" />
        </Link>

        <Link to="/explorar" className="fixed">
          <img data-testid="explore-bottom-btn" src={ explore } alt="icon explore" />
        </Link>

        <Link to="/comidas" className="fixed">
          <img data-testid="food-bottom-btn" src={ food } alt="icon food" />
        </Link>
      </footer>
    </div>
  );
}

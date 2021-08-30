import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './BottomMenu.css';

function BottomMenu() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" alt="Drink" src={ drinkIcon } />
      </Link>
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" alt="Explore" src={ exploreIcon } />
      </Link>
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" alt="Food" src={ mealIcon } />
      </Link>
    </footer>
  );
}
export default BottomMenu;

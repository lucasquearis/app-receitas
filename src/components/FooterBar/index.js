import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import { Footer } from './style';

function FooterBar() {
  return (
    <Footer className="footer-bar" data-testid="footer">
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" alt="Food" src={ mealIcon } />
      </Link>
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" alt="Drink" src={ drinkIcon } />
      </Link>
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" alt="Explore" src={ exploreIcon } />
      </Link>
    </Footer>
  );
}

export default FooterBar;

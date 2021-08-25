import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <div className="footer-wrapper">
      <footer data-testid="footer">
        <div className="icons">
          <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks-bottom" />
          <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
          <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal" />
        </div>
      </footer>
    </div>
  );
}

export default Footer;

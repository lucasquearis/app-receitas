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
          <button type="button">
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinks-bottom" />
          </button>
          <button type="button">
            <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
          </button>
          <button type="button">
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

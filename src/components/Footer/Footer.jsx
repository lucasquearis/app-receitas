import React from 'react';
import { Link } from 'react-router-dom';
import drinkIconImg from '../../images/drinkIcon.svg';
import exploreIconImg from '../../images/exploreIcon.svg';
import mealIconImg from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn" src={ drinkIconImg }>
        <img src={ drinkIconImg } alt="drinks-button" width="50px" height="50px" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn" src={ exploreIconImg }>
        <img src={ exploreIconImg } alt="profile-button" width="50px" height="50px" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn" src={ mealIconImg }>
        <img src={ mealIconImg } alt="profile-button" width="50px" height="50px" />
      </Link>
    </footer>
  );
}

export default Footer;

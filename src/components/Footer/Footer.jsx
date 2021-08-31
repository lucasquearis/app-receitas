import React from 'react';
import { Link } from 'react-router-dom';
import drinkIconImg from '../../images/drinkIcon.svg';
import exploreIconImg from '../../images/exploreIcon.svg';
import mealIconImg from '../../images/mealIcon.svg';
import { FooterSection, FooterImg } from './styles';

function Footer() {
  return (
    <FooterSection data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn" src={ drinkIconImg }>
        <FooterImg src={ drinkIconImg } alt="drinks-button" width="50px" height="50px" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn" src={ exploreIconImg }>
        <FooterImg
          src={ exploreIconImg }
          alt="profile-button"
          width="50px"
          height="50px"
        />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn" src={ mealIconImg }>
        <FooterImg src={ mealIconImg } alt="profile-button" width="50px" height="50px" />
      </Link>
    </FooterSection>
  );
}

export default Footer;

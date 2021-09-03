import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import drinkIconImg from '../../images/drinkIcon.svg';
import exploreIconImg from '../../images/exploreIcon.svg';
import mealIconImg from '../../images/mealIcon.svg';
import { changeFilterType } from '../../redux/actions/filterAction';
import { FooterSection, FooterImg } from './styles';

function Footer() {
  const dispatch = useDispatch();
  return (
    <FooterSection data-testid="footer">
      <Link
        to="/bebidas"
        data-testid="drinks-bottom-btn"
        src={ drinkIconImg }
        onClick={ () => dispatch(changeFilterType('searchBar')) }
      >
        <FooterImg src={ drinkIconImg } alt="drinks-button" width="50px" height="50px" />
      </Link>
      <Link
        to="/explorar"
        data-testid="explore-bottom-btn"
        src={ exploreIconImg }
      >
        <FooterImg
          src={ exploreIconImg }
          alt="profile-button"
          width="50px"
          height="50px"
        />
      </Link>
      <Link
        to="/comidas"
        data-testid="food-bottom-btn"
        src={ mealIconImg }
        onClick={ () => dispatch(changeFilterType('searchBar')) }
      >
        <FooterImg src={ mealIconImg } alt="profile-button" width="50px" height="50px" />
      </Link>
    </FooterSection>
  );
}

export default Footer;

import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

const Footer = () => {
  const history = useHistory();

  return (
    <>
      {/* <div className="footer-space" /> */}
      <footer data-testid="footer">
        <button type="button" onClick={ () => history.push('/bebidas') }>
          <img src={ drinkIcon } alt="Perfil" data-testid="drinks-bottom-btn" />
        </button>
        <button type="button" onClick={ () => history.push('/explorar') }>
          <img src={ exploreIcon } alt="Perfil" data-testid="explore-bottom-btn" />
        </button>
        <button type="button" onClick={ () => history.push('/comidas') }>
          <img src={ mealIcon } alt="Perfil" data-testid="food-bottom-btn" />
        </button>
      </footer>
    </>
  );
};

export default Footer;

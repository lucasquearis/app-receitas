import React from 'react';
import { Link } from 'react-router-dom';
import IconBtn from '../IconBtn';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  const bebidasBtnProps = {
    dataId: 'drinks-bottom-btn',
    src: drinkIcon,
    alt: 'Botão Bebidas',
  };

  const explorarBtnProps = {
    dataId: 'explore-bottom-btn',
    src: exploreIcon,
    alt: 'Botão Explorar',
  };

  const comidasBtnProps = {
    dataId: 'food-bottom-btn',
    src: mealIcon,
    alt: 'Botão Comidas',
  };

  return (
    <div data-testid="footer">
      <Link to="/bebidas">
        <IconBtn { ...bebidasBtnProps } />
      </Link>
      <Link to="/explorar">
        <IconBtn { ...explorarBtnProps } />
      </Link>
      <Link to="/comidas">
        <IconBtn { ...comidasBtnProps } />
      </Link>
    </div>
  );
}

export default Footer;

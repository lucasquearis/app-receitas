import React from 'react';
import { Link } from 'react-router-dom';
import IconBtn from '../IconBtn';

function Footer() {
  const bebidasBtnProps = {
    dataId: 'drinks-bottom-btn',
    src: '/images/drinkIcon.svg',
    alt: 'Botão Bebidas',
  };

  const explorarBtnProps = {
    dataId: 'explore-bottom-btn',
    src: '/images/exploreIcon.svg',
    alt: 'Botão Explorar',
  };

  const comidasBtnProps = {
    dataId: 'food-bottom-btn',
    src: '/images/mealIcon.svg',
    alt: 'Botão Comidas',
  };

  return (
    <div data-testId="footer">
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

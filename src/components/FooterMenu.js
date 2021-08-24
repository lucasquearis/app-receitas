import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const FooterMenu = () => (
  <footer data-testid="footer">
    <Link to="/bebidas">
      <Button
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img src={ drinkIcon } alt="Botão drink" />
      </Button>
    </Link>
    <Link to="/explorar">
      <Button
        type="button"
        data-testid="explore-bottom-btn"

      >
        <img src={ exploreIcon } alt="Botão explorar" />
      </Button>
    </Link>
    <Link to="/comidas">
      <Button
        type="button"
        data-testid="food-bottom-btn"
      >
        <img src={ mealIcon } alt="Botão refeição" />
      </Button>
    </Link>
  </footer>
);

export default FooterMenu;

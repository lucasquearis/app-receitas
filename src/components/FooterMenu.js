import React from 'react';
import { Button } from 'react-bootstrap';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const FooterMenu = () => (
  <footer data-testis="footer">
    <Button
      type="button"
      data-testid="drinks-bottom-btn"
    >
      <img src={ drinkIcon } alt="Botão drink" />
    </Button>
    <Button
      type="button"
      data-testid="explore-bottom-btn"

    >
      <img src={ exploreIcon } alt="Botão explorar" />
    </Button>
    <Button
      type="button"
      data-testid="food-bottom-btn"
    >
      <img src={ mealIcon } alt="Botão refeição" />
    </Button>
  </footer>
);

export default FooterMenu;

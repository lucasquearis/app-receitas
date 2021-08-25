import React from 'react';
import { useHistory } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function FooterMenu() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => history.push('/bebidas') }
        data-testid="drinks-bottom-btn"
      >
        <img
          src={ drinkIcon }
          alt="botão de drinks"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar') }
        data-testid="explore-bottom-btn"
      >
        <img
          src={ exploreIcon }
          alt="explorar"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/comidas') }
        data-testid="food-bottom-btn"
      >
        <img
          src={ mealIcon }
          alt="explorar"
        />
      </button>
    </footer>
  );
}
export default FooterMenu;

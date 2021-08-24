import React from 'react';
import { useHistory } from 'react-router';

import DrinkIcon from '../../images/drinkIcon.svg';
import ExploreIcon from '../../images/exploreIcon.svg';
import MealIcon from '../../images/mealIcon.svg';

import '../../styles/footer.css';

export default function Footer() {
  const history = useHistory();

  return (
    <div data-testid="footer" className="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
        src={ DrinkIcon }
      >
        <img src={ DrinkIcon } alt="Bebidas" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
        src={ ExploreIcon }
      >
        <img src={ ExploreIcon } alt="Explorar" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/comidas') }
        src={ MealIcon }
      >
        <img src={ MealIcon } alt="Comidas" />
      </button>
    </div>
  );
}

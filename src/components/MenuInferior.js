import React from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';

import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function MenuInferior() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <button
        type="button"
        onClick={ () => history.push('/explorar') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Ícone para a página de exploração de receitas"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/comidas') }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Ícone para a página de exploração de receitas"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/bebidas') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Ícone para a página de exploração de receitas"
        />
      </button>
    </footer>
  );
}

export default MenuInferior;

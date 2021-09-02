import { bool, func, number, string } from 'prop-types';
import React from 'react';

export default function IngredientsCard({ index, name, isFood, onClick }) {
  const END_POINT = isFood ? 'https://www.themealdb.com/images/ingredients/'
    : 'https://www.thecocktaildb.com/images/ingredients/';
  // https://github.com/tryber/sd-012-project-recipes-app/pull/848
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <button
        style={ { width: '100%' } }
        onClick={ onClick }
        type="button"
      >
        <h3 data-testid={ `${index}-card-name` }>{name}</h3>
        <img
          data-testid={ `${index}-card-img` }
          src={ `${END_POINT}${name}-Small.png` }
          alt={ name }
        />
      </button>
    </div>
  );
}

IngredientsCard.propTypes = {
  index: number.isRequired,
  name: string.isRequired,
  isFood: bool.isRequired,
  onClick: func.isRequired,
};

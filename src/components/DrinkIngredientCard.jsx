import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';

function DrinkIngredientCard({ ingredients, index, onClick }) {
  return (
    <li
      data-testid={ `${index}-ingredient-card` }
    >
      <Card role="button" onClick={ onClick }>
        <p
          data-testid={ `${index}-card-name` }
        >
          { ingredients.strIngredient1 }
        </p>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients.strIngredient1}-Small.png` }
          alt={ ingredients.strIngredient1 }
        />
      </Card>
    </li>
  );
}

DrinkIngredientCard.propTypes = {
  ingredients: PropTypes.shape(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DrinkIngredientCard;

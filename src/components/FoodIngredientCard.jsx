import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';

function FoodIngredientCard({ ingredients, index, onClick }) {
  return (
    <li
      data-testid={ `${index}-ingredient-card` }
    >
      <Card onClick={ onClick }>
        <p
          data-testid={ `${index}-card-name` }
        >
          { ingredients.strIngredient }
        </p>
        <img
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${ingredients.strIngredient}-Small.png` }
          alt={ ingredients.strIngredient }
        />
      </Card>
    </li>
  );
}

FoodIngredientCard.propTypes = {
  ingredients: PropTypes.shape(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FoodIngredientCard;

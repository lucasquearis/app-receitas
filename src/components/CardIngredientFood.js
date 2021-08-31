import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardIngredientFood(props) {
  const { food, i } = props;
  return (
    <div data-testid={ `${i}-ingredient-card` }>
      <Link to="/explorar/comidas">
        <h4 data-testid={ `${i}-card-name` }>{food.strIngredient}</h4>
        <img
          data-testid={ `${i}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` }
          alt={ food.strIngredient }
        />
      </Link>
    </div>
  );
}

CardIngredientFood.propTypes = {
  food: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardIngredientFood;

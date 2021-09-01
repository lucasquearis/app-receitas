import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardIngredientDrink(props) {
  const { drink, i } = props;
  const ingrediente = () => setIngredient(drink.strIngredient);

  return (
    <div data-testid={ `${i}-ingredient-card` }>
      <Link to="/explorar/bebidas">
        <button type="button" onClick={ ingrediente }>
          <h4 data-testid={ `${i}-card-name` }>{drink.strIngredient1}</h4>
          <img
            data-testid={ `${i}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
            alt={ drink.strIngredient1 }
          />
        </button>
      </Link>
    </div>
  );
}

CardIngredientDrink.propTypes = {
  drink: PropTypes.arrayOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardIngredientDrink;

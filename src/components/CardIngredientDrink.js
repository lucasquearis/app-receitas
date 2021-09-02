import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

function CardIngredientDrink(props) {
  const { drink, i } = props;
  const { setIngredient } = useContext(MainContext);
  const ingrediente = () => setIngredient(drink.strIngredient1);

  return (
    <div data-testid={ `${i}-ingredient-card` }>
      <Link to="/bebidas" data-testid={ `${i}-recipe-card` }>
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

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

function CardIngredientFood(props) {
  const { food, i } = props;
  const { setIngredient } = useContext(MainContext);
  const ingrediente = () => setIngredient(food.strIngredient);

  return (
    <div data-testid={ `${i}-ingredient-card` }>
      <Link to="/comidas" data-testid={ `${i}-recipe-card` }>
        <button type="button" onClick={ ingrediente }>
          <h4 data-testid={ `${i}-card-name` }>{food.strIngredient}</h4>
          <img
            data-testid={ `${i}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${food.strIngredient}-Small.png` }
            alt={ food.strIngredient }
          />
        </button>
      </Link>
    </div>
  );
}
CardIngredientFood.propTypes = {
  food: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardIngredientFood;

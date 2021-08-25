import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

const Card = ({ item, foodOrDrink, index }) => {
  const { foodData, drinkData } = useContext(RecipesContext);
  const test = foodOrDrink === 'Meal' ? foodData : drinkData;
  if (test !== null && test.length > 0) {
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ item[`str${foodOrDrink}Thumb`] }
          alt="recipe"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{item[`str${foodOrDrink}`]}</span>
      </div>
    );
  }
  return <p> </p>;
};

Card.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
  foodOrDrink: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;

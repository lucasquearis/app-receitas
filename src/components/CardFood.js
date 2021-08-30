import React from 'react';
import PropTypes from 'prop-types';

function CardFood(props) {
  const { meal } = props;
  return (
    <div>
      <p>{meal.strMeal}</p>
      <p>{meal.strCategory}</p>
    </div>
  );
}

CardFood.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CardFood;

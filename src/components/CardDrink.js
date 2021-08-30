import React from 'react';
import PropTypes from 'prop-types';

function CardDrink(props) {
  const { drink } = props;
  return (
    <p>{drink.strDrink}</p>
  );
}

CardDrink.propTypes = {
  drink: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CardDrink;

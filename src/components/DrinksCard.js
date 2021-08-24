import React from 'react';
import PropTypes from 'prop-types';

const DrinksCard = ({ drink, index }) => (
  <div className="drinks-card" data-testid={ `${index}-recipe-card` }>
    <img src={ drink.strDrinkThumb } alt="drink" data-testid={ `${index}-card-img` } />
    <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
  </div>
);

DrinksCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinksCard;

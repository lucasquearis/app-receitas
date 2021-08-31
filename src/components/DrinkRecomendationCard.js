import React from 'react';
import PropTypes from 'prop-types';

const DrinkRecomendationCard = ({ drink, index }) => (
  <div
    key={ index }
    className="recomended-card"
    data-testid={ `${index}-recomendation-card` }
  >
    <img src={ drink.strDrinkThumb } alt="drink" data-testid={ `${index}-card-img` } />
    <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</p>
  </div>
);

DrinkRecomendationCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkRecomendationCard;

import React from 'react';
import PropTypes from 'prop-types';

const FoodRecomendationCard = ({ recipe, index }) => (
  <div className="recomended-card" data-testid={ `${index}-recomendation-card` }>
    <img src={ recipe.strMealThumb } alt="meal" data-testid={ `${index}-card-img` } />
    <p data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</p>
  </div>
);

FoodRecomendationCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodRecomendationCard;

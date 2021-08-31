import React from 'react';
import PropTypes from 'prop-types';

const FoodRecomendationCard = ({ recipe, index }) => (
  <div className="recomended-card" data-testid={ `${index}-recomendation-card` }>
    <img src={ recipe.strMealThumb } alt="meal" data-testid={ `${index}-card-img` } />
    <p data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</p>
  </div>
);

FoodRecomendationCard.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodRecomendationCard;

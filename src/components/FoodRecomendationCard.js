import React from 'react';
import PropTypes from 'prop-types';

const FoodRecomendationCard = (recipe, indice) => (
  <div className="recomended-card" data-testid={ `${indice}-recomendation-card` }>
    <img src={ recipe.strMealThumb } alt="meal" data-testid={ `${indice}-card-img` } />
    <p data-testid={ `${indice}-card-name` }>{ recipe.strMeal }</p>
  </div>
);

FoodRecomendationCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodRecomendationCard;

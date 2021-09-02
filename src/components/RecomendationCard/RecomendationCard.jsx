import React from 'react';
import PropTypes from 'prop-types';
import H4 from './styles';

const RecomendationCard = ({ recipe, index }) => (
  <section data-testid={ `${index}-recomendation-card` } className="recomendation-card">
    <img
      src={ recipe.strMealThumb || recipe.strDrinkThumb }
      alt="food thumb"
    />
    <H4 data-testid={ `${index}-recomendation-title` }>
      {recipe.strMeal || recipe.strDrink}
    </H4>
  </section>
);

RecomendationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;

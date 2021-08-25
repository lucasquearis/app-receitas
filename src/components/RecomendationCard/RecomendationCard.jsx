import React from 'react';
import PropTypes from 'prop-types';

const RecomendationCard = ({ recipe, index }) => (
  <section data-testid={ `${index}-recomendation-card` } className="recomendation-card">
    <img
      // style={ { width: '90px' } }
      src={ recipe.strMealThumb || recipe.strDrinkThumb }
      alt="food thumb"
    />
    <h4 data-testid={ `${index}-recomendation-title` }>
      {recipe.strMeal || recipe.strDrink}
    </h4>
  </section>
);

RecomendationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecomendationCard;

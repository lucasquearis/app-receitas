import React from 'react';
import PropTypes from 'prop-types';
import { CardSection, CardImg, CardH2 } from './styles';

const RecipeCard = ({ recipe, index }) => (
  <CardSection data-testid={ `${index}-recipe-card` }>
    <CardImg
      data-testid={ `${index}-card-img` }
      src={ recipe.strMealThumb || recipe.strDrinkThumb }
      alt="food thumb"
    />
    <CardH2 data-testid={ `${index}-card-name` }>
      {recipe.strMeal || recipe.strDrink}
    </CardH2>
  </CardSection>
);

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;

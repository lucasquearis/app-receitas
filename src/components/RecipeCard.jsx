import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ recipe, index }) {
  return (

    <div
      key={ recipe.idMeal || recipe.idDrink }
      data-testid={ `${index}-recipe-card` }
    >
      <div>
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid={ `${index}-card-img` }
        />
      </div>
      <div>
        <h2 data-testid={ `${index}-card-name` }>
          { recipe.strMeal || recipe.strDrink }
        </h2>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;

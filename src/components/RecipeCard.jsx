import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css'

function RecipeCard({ recipe, index }) {
  return (

    <div
      className="recipecard"
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
        <p data-testid={ `${index}-card-name` }>
          { recipe.strMeal || recipe.strDrink }
        </p>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;

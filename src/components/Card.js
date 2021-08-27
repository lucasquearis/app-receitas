import React from 'react';
import { PropTypes } from 'prop-types';

function Card({ recipe, index }) {
  return (
    <div
      className="card border border-danger"
      key={ recipe.idMeal || recipe.idDrink }
      data-testid={ `${index}-recipe-card` }
    >
      <div className="card-img-top">
        <img
          className="img-fluid"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid={ `${index}-card-img` }
        />
      </div>
      <div className="card-inner">
        <h2 className="title-recipe" data-testid={ `${index}-card-name` }>
          { recipe.strMeal || recipe.strDrink }
        </h2>
      </div>
    </div>
  );
}

Card.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;

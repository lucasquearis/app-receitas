import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import UnfavoriteButton from './UnfavoriteButton';

import '../styles/FavoriteRecipeCard.css';

export default function FavoriteRecipeCard({ recipe, index }) {
  const isFood = recipe.type === 'comida';

  return (
    <div className="favorite-recipe-card">
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="favorite-recipe-info">
        <span data-testid={ `${index}-horizontal-top-text` }>
          {isFood ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
        </span>

        <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </p>
        </Link>
        <div className="favorite-card-buttons-container">
          <ShareButton
            recipeId={ recipe.id }
            isFood={ isFood }
            index={ index }
          />

          <UnfavoriteButton
            recipe={ recipe }
            index={ index }
          />
        </div>

      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;

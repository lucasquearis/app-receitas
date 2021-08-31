import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, func, number, shape } from 'prop-types';
import HandleFavoriteAndShare from './HandleFavoriteAndShare';

function FavoriteRecipesCard({ recipe, index, isFood, removeFavorite }) {
  const { image, name, category, area, alcoholicOrNot, id } = recipe;
  return (
    <div>
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      {
        isFood ? (
          <div>
            <span data-testid={ `${index}-horizontal-top-text` }>
              { area }
              {' - '}
              {category}
            </span>
          </div>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
        )
      }
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </p>
      </Link>
      <HandleFavoriteAndShare
        index={ index }
        recipe={ recipe }
        id={ id }
        isFood={ recipe.type === 'comida' }
        removeFavorite={ removeFavorite }
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

FavoriteRecipesCard.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
  isFood: bool.isRequired,
  removeFavorite: func.isRequired,
};

export default connect(mapStateToProps)(FavoriteRecipesCard);

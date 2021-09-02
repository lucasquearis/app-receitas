import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, func, number, shape } from 'prop-types';
import HandleFavoriteAndShare from './HandleFavoriteAndShare';
import './favoriteRecipesCard.css';

function FavoriteRecipesCard({ recipe, index, isFood, removeFavorite }) {
  const { image, name, category, area, alcoholicOrNot, id } = recipe;
  return (
    <div className="container-card">
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="container-textAndIcons">
        {
          isFood ? (
            <div>
              <p data-testid={ `${index}-horizontal-top-text` }>
                { area }
                {' - '}
                {category}
              </p>
            </div>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
          )
        }
        <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${id}` }>
          <h3
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h3>
        </Link>
        <div className="container-icons">
          <HandleFavoriteAndShare
            index={ index }
            recipe={ recipe }
            id={ id }
            isFood={ recipe.type === 'comida' }
            removeFavorite={ removeFavorite }
          />
        </div>
      </div>
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

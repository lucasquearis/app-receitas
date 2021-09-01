import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIconPath from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';
import './css/FavoriteCard.css';

const FavCard = ({ favRecipe, index, handleClickShare }) => (
  <div className="fav-recipe-card">
    <Link to={ `${favRecipe.type}s/${favRecipe.id}` } className="horizontal-image-link">
      <img
        src={ favRecipe.image }
        alt="Imagem da Receita"
        data-testid={ `${index}-horizontal-image` }
        className="horizontal-image"
      />
    </Link>
    <div className="fav-recipe-details">
      <Link
        to={ `${favRecipe.type}s/${favRecipe.id}` }
        className="fav-recipe-name-link"
      >
        <span className="fav-recipe-name" data-testid={ `${index}-horizontal-name` }>
          {favRecipe.name}
        </span>
      </Link>
      <span
        className="fav-recipe-category"
        data-testid={ `${index}-horizontal-top-text` }
      >
        {favRecipe.type === 'comida'
          ? `${favRecipe.area} - ${favRecipe.category}`
          : `${favRecipe.alcoholicOrNot}`}
      </span>

      <div className="fav-category-share-container">
        <input
          type="image"
          id={ `${favRecipe.type}s-${favRecipe.id} ${index}` }
          className="fav-recipe-share-icon"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIconPath }
          alt="Share"
          onClick={ handleClickShare }
        />
        <FavoriteButton
          recipe={ favRecipe }
          id={ favRecipe.id }
          horizontal
          index={ index }
        />
      </div>
    </div>
  </div>
);
FavCard.propTypes = {
  favRecipe: PropTypes.PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  handleClickShare: PropTypes.func.isRequired,
};

export default FavCard;

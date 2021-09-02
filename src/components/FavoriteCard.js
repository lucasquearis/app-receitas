import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './doneCard.css';

const copy = require('clipboard-copy');

function FavoriteCard(props) {
  const { recipe, updateFavorite, index } = props;
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe;
  const [sharedMessage, setSharedMessage] = useState(false);
  const PERIOD_OF_MESSAGE = 1000;

  const removeFromFavorites = (recipeId) => {
    const oldFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = oldFavorite.filter((favorite) => favorite.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    updateFavorite(newFavorite);
  };

  const showSharedMessage = () => {
    setSharedMessage(true);
    setTimeout(() => setSharedMessage(false), PERIOD_OF_MESSAGE);
  };

  const copyLink = () => {
    const linkBase = window.location.origin;
    const linkToDetails = `${linkBase}/${type}s/${id}`;
    copy(linkToDetails);
    showSharedMessage();
  };

  return (
    <div className="done-card">
      <Link to={ `/${type}s/${id}` }>
        <Image
          fluid
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="info-favorite">
        <div className="category-area">
          { (type === 'comida') ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              <span>{ area }</span>
              {' - '}
              <span>{ category }</span>
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
          ) }
        </div>
        <Link to={ `/${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        </Link>
        <div className="icons">
          <Image
            alt="Remove from favorites"
            onClick={ () => removeFromFavorites(id) }
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
          />
          <Image
            alt="Share button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ copyLink }
          />
        </div>
        { sharedMessage && <p>Link copiado!</p> }
      </div>
    </div>
  );
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  updateFavorite: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteCard;

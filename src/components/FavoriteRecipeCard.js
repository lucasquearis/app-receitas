// vitals
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
// styles
import '../styles/FavoriteRecipes.css';
import favoriteButton from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const renderTitle = (alcoholicOrNot, area, category, type, index) => {
  if (type === 'bebida' && alcoholicOrNot.includes('Non')) {
    return (
      <div className="title-container">
        <h5>{alcoholicOrNot}</h5>
      </div>
    );
  }

  if (type === 'comida' && area) {
    return (
      <div className="title-container">
        <h4 data-testid={ `${index}-horizontal-top-text` }>{`${area} - ${category}`}</h4>
      </div>
    );
  }

  return (
    <div className="title-container">
      <h4 data-testid={ `${index}-horizontal-top-text` }>{category}</h4>
    </div>
  );
};

function FavoriteRecipeCard(
  { id, index, alcoholicOrNot, area, category, image,
    name, type, favoritesArray, setFavoritesArray },
) {
  const [copiedURL, setCopiedURL] = useState(false);
  const history = useHistory();

  return (
    <div className="card-element">
      <div className="favorites-image-container">
        <input
          type="image"
          src={ image }
          alt={ `Foto do produto ${name}` }
          data-testid={ `${index}-horizontal-image` }
          onClick={ () => {
            history.push(`/${type}/${id}`);
          } }
        />
      </div>
      <div className="info-container">
        { renderTitle(alcoholicOrNot, area, category, type, index)}
        <div className="name-container">
          <button
            type="button"
            onClick={ () => history.push(`/${type}/${id}`) }
          >
            <h4
              data-testid={ `${index}-horizontal-name` }
            >
              {name}
            </h4>
          </button>
        </div>
        <div className="favorite-and-share-buttons">
          <input
            type="image"
            src={ favoriteButton }
            alt="Ícone de favorito"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => {
              const newFavorites = favoritesArray
                .filter((favorite) => favorite.id !== id);

              setFavoritesArray(newFavorites);

              localStorage
                .setItem('favoriteRecipes', JSON.stringify(newFavorites));
            } }
          />
          <input
            type="image"
            src={ shareIcon }
            alt="Ícone de copiar"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              copy(`http://localhost:3000/${type}s/${id}`);
              setCopiedURL(true);
            } }
          />
          {copiedURL ? <span>Link copiado!</span> : null}
        </div>

      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  image: PropTypes.string,
  area: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}.isRequired;
export default FavoriteRecipeCard;

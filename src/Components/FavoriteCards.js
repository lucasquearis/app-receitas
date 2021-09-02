import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copyToClipBoard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteCards(props) {
  const { recipe, index, onFavoriteClick, handleRedirect } = props;

  const [copyMessage, setCopyMessage] = useState(false);

  const getCategory = () => {
    if (recipe.type === 'comida') {
      return (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${recipe.area} - ${recipe.category}` }
        </p>
      );
    }

    return (
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { recipe.alcoholicOrNot }
      </p>
    );
  };

  const onShareClick = () => {
    setCopyMessage(true);
    const showTime = 1000;
    let url = `http://localhost:3000/bebidas/${recipe.id}`;
    if (recipe.type === 'comida') {
      url = `http://localhost:3000/comidas/${recipe.id}`;
    }

    copyToClipBoard(url);

    setTimeout(() => {
      setCopyMessage(false);
    }, showTime);
  };

  return (
    <section className="favorite-card" data-testid="favorite-card">
      <div className="image-section">
        <button
          type="button"
          className="card-btn"
          onClick={ () => handleRedirect(recipe.id, recipe.type) }
        >
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </button>
      </div>
      <div className="info-section">
        <div className="infos">
          { getCategory() }
          <button
            type="button"
            className="card-btn"
            onClick={ () => handleRedirect(recipe.id, recipe.type) }
          >
            <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
          </button>
        </div>
        { copyMessage && <p className="copy-message">Link copiado!</p> }
        <div className="buttons-section">
          <button type="button" className="card-btn" onClick={ onShareClick }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="botão de compartilhar"
            />
          </button>
          <button
            type="button"
            className="card-btn"
            onClick={ () => onFavoriteClick(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="botão de favoritar"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

FavoriteCards.propTypes = {
  recipe: PropTypes.shape({
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  handleRedirect: PropTypes.func.isRequired,
};

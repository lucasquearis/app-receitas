import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copyToClipBoard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteCards(props) {
  const { recipe, index } = props;

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
    <section className="favorite-card">
      <div className="image-section">
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </div>
      <div className="info-section">
        <div className="infos">
          { getCategory() }
          <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
        </div>
        { copyMessage && <p className="copy-message">Link copiado!</p> }
        <div className="buttons-section">
          <button type="button" className="share-btn" onClick={ onShareClick }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="botão de compartilhar"
            />
          </button>
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="botão de favoritar"
          />
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
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';

const FavoriteRecipe = ({ index, id, type, name, image, category, area, alcoholic }) => {
  const [copied, setCopied] = useState('');

  const copyLink = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied('Link copiado!');
  };

  if (type === 'comida') {
    return (
      <div>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
        <p data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</p>
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <section className="buttons-container">
          <label htmlFor="share">
            <input
              id="share"
              type="image"
              alt="Botão compartilhar"
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ copyLink }
            />
            {copied}
          </label>
          <input
            type="image"
            src={ favoriteIcon }
            alt="Botão de favoritar"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </section>
      </div>
    );
  }
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src={ image }
        alt={ name }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>{ `${alcoholic}` }</p>
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <section className="buttons-container">
        <label htmlFor="share">
          <input
            id="share"
            type="image"
            alt="Botão compartilhar"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ copyLink }
          />
          {copied}
        </label>
        <input
          type="image"
          src={ favoriteIcon }
          alt="Botão de favoritar"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </section>
    </div>
  );
};

FavoriteRecipe.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.node.isRequired,
  alcoholic: PropTypes.string.isRequired,
};

export default FavoriteRecipe;

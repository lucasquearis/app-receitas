import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import shareButtonIcon from '../../images/shareIcon.svg';

function FavoriteCard({ recipe, cardIndex }) {
  const { name, area, category, type, id, image, alcoholicOrNot } = recipe;
  return (
    <section>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          width="150px"
          height="150px"
          data-testid={ `${cardIndex}-horizontal-image` }
        />
      </Link>
      <div>
        <p data-testid={ `${cardIndex}-horizontal-top-text` }>
          {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
        </p>
        <Link to={ `/${type}s/${id}` }>
          <p data-testid={ `${cardIndex}-horizontal-name` }>{name}</p>
        </Link>
        <button
          type="button"
          data-testid={ `${cardIndex}-horizontal-share-btn` }
          src={ shareButtonIcon }
        >
          <img src={ shareButtonIcon } alt="share-button" />
        </button>
      </div>
    </section>
  );
}

export default FavoriteCard;

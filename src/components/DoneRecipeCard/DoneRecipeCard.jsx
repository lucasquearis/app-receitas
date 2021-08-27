import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import shareButtonIcon from '../../images/shareIcon.svg';

function DoneRecipeCard({ recipe, cardIndex }) {
  const { image, name, type, area, category,
    alcoholicOrNot, doneDate, tags, id } = recipe;

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
        <p data-testid={ `${cardIndex}-horizontal-done-date` }>
          {`Feita em: ${doneDate}`}
        </p>
        <button
          type="button"
          data-testid={ `${cardIndex}-horizontal-share-btn` }
          src={ shareButtonIcon }
        >
          <img src={ shareButtonIcon } alt="share-button" />
        </button>
        <div>
          {tags.map((tag) => (
            <span key={ tag } data-testid={ `${cardIndex}-${tag}-horizontal-tag` }>
              {tag}
            </span>))}
        </div>
      </div>
    </section>
  );
}

DoneRecipeCard.propTypes = {
  recipe: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    area: propTypes.string,
    category: propTypes.string,
    alcoholicOrNot: propTypes.string,
    name: propTypes.string,
    image: propTypes.string,
    doneDate: propTypes.string,
    tags: propTypes.arrayOf(propTypes.string),
  }).isRequired,
  cardIndex: propTypes.number.isRequired,
};

export default DoneRecipeCard;

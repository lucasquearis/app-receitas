import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ recipe, index }) {
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipe;

  // // const tagsTratada = tags === null ? [] : tags.split(',');
  const tagsTratada = tags === null ? [] : [...tags];

  const [sharedMessage, setSharedMessage] = useState(false);
  const PERIOD_OF_MESSAGE = 1000;
  const showSharedMessage = () => {
    setSharedMessage(true);
    setTimeout(() => setSharedMessage(false), PERIOD_OF_MESSAGE);
  };

  const copyLink = () => {
    showSharedMessage();
    const linkBase = window.location.origin;
    const linkToDetails = `${linkBase}/${type}s/${id}`;
    copy(linkToDetails);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <input
          type="image"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="100px"
        />
      </Link>

      <div>
        {(type === 'bebida')
          ? (<p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>)
          : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${area} - ${category}` }
            </p>
          )}
      </div>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {`Feita em: ${doneDate}`}
      </p>
      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="share icon"
        onClick={ copyLink }
      />
      { sharedMessage && <p>Link copiado!</p> }

      <p id={ `${index}-horizontal-share-btn` }>Compartilhar</p>
      { tagsTratada
        ? tagsTratada.map((tag) => (
          <p
            key={ index }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </p>
        )) : null}
    </div>
  );
}

DoneCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    img: PropTypes.string,
    doneDate: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneCard;

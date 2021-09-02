import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import './doneCard.css';

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
    <div className="done-card">
      <Link to={ `/${type}s/${id}` }>
        <Image
          fluid
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="info">
        <div className="category-area">
          {(type === 'bebida')
            ? (<p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>)
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${area} - ${category}` }
              </p>
            )}
          <Image
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share icon"
            onClick={ copyLink }
          />
        </div>
        <Link to={ `/${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{name}</h4>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em: ${doneDate}`}
        </p>
        { sharedMessage && <p>Link copiado!</p> }

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

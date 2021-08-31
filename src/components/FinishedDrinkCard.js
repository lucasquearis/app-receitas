import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareImage from '../images/shareIcon.svg';
import { handleShare } from '../auxiliar/auxiliarFunctions';

function FinishedDrinkCard({ card, index }) {
  const [link, setLink] = useState();
  const { image, name, doneDate, tags, alcoholicOrNot, id } = card;
  return (
    <div key={ index }>
      <Link to={ `/bebidas/${id}` }>
        <img
          src={ image }
          alt="card-recipe"
          data-testid={ `${index}-horizontal-image` }
          width="250px"
        />
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</h3>
      <Link to={ `/bebidas/${id}` }>
        <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <input
        type="image"
        alt="share"
        src={ shareImage }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => handleShare(setLink, `bebidas/${id}`) }
      />
      <p>{ link }</p>
      { tags.map((item) => {
        const tagItem = (
          <p key={ item } data-testid={ `${index}-${item}-horizontal-tag` }>{ item }</p>
        );
        return tagItem;
      }) }
    </div>
  );
}

FinishedDrinkCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FinishedDrinkCard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareImage from '../images/shareIcon.svg';
import { handleShare } from '../auxiliar/auxiliarFunctions';

function FinishedMealCard({ card, index }) {
  const [link, setLink] = useState();
  const { image, area, category, name, doneDate, tags, id } = card;
  return (
    <div key={ index }>
      <Link to={ `/comidas/${id}` }>
        <img
          src={ image }
          alt="card-recipe"
          data-testid="0-horizontal-image"
          width="250px"
        />
      </Link>
      <h3 data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</h3>
      <Link to={ `/comidas/${id}` }>
        <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <input
        type="image"
        alt="share"
        src={ shareImage }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => handleShare(setLink, `comidas/${id}`) }
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

FinishedMealCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FinishedMealCard;

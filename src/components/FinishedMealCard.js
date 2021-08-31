import React from 'react';
import PropTypes from 'prop-types';

function FinishedMealCard({ card, index }) {
  const { image, area, category, name, doneDate, tags } = card;
  return (
    <div key={ index }>
      <img
        src={ image }
        alt="card-recipe"
        data-testid="0-horizontal-image"
        width="250px"
      />
      <h3 data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</h3>
      <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      <button type="button" data-testid={ `${index}-horizontal-share-btn` }>Share</button>
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

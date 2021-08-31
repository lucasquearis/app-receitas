import React from 'react';
import PropTypes from 'prop-types';

function FinishedDrinkCard({ card, index }) {
  const { image, name, doneDate, tags, alcoholicOrNot } = card;
  return (
    <div key={ index }>
      <img
        src={ image }
        alt="card-recipe"
        data-testid={ `${index}-horizontal-image` }
        width="250px"
      />
      <h3 data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</h3>
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

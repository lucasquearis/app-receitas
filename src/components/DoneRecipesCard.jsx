import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function DoneRecipesCard({
  index,
  image,
  type,
  category,
  alcoholicOrNot,
  name,
  doneDate,
  tags,
  area,
  id,
}) {
  const lenghtTag = 2;
  return (
    <Link to={ `/${type}/${id}` }>
      <div>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="foto-da-api-"
        />
        <div>
          <div>
            <p
              Data-testid={ `${index}-horizontal-top-text` }
            >
              { category }
            </p>
            <ShareButton data-testid={ `${index}-horizontal-share-btn` } />
          </div>
          <p>
            { alcoholicOrNot }
            { area }
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            { doneDate }
          </p>
          {tags.slice(0, lenghtTag).map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tags}-horizontal-tag` }
            >
              { tag }
            </p>))}
        </div>
      </div>
    </Link>

  );
}

DoneRecipesCard.propTypes = ({
  index: PropTypes.number,
  image: PropTypes.image,
  type: PropTypes.string,
  category: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  area: PropTypes.string,
  id: PropTypes.number,
}).isRequired;

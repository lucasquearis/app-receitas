import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function CookedRecipesCard({
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
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="foto-da-api-"
        />
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </p>
      </Link>
      <div>
        <div>
          <ShareButton datatestid={ `${index}-horizontal-share-btn` } />
        </div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
          { `${area} - ${category}` }
        </p>
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          { doneDate }
        </p>
        {tags.slice(0, lenghtTag).map((tag) => (
          <p
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>))}
      </div>
    </div>

  );
}

CookedRecipesCard.propTypes = ({
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

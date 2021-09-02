import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

export default function FavoriteRecipesCard({
  index,
  image,
  type,
  category,
  alcoholicOrNot,
  name,
  area,
  id,
}) {
  return (
    <Link to={ `/${type}s/${id}` }>
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
            <ShareButton datatestid={ `${index}-horizontal-share-btn` } />
            <FavoriteButton />
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
        </div>
      </div>
    </Link>

  );
}

FavoriteRecipesCard.propTypes = ({
  index: PropTypes.number,
  image: PropTypes.image,
  type: PropTypes.string,
  category: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  name: PropTypes.string,
  area: PropTypes.string,
  id: PropTypes.number,
}).isRequired;

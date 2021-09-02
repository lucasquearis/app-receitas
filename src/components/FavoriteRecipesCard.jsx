import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import './CookedAndFavoriteCard.css';

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
    <Card>
      <Link to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="foto-da-api-"
          className="imageRecipes"
        />
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </p>
      </Link>
      <div>
        <div>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot }
            { `${area} - ${category}` }
          </p>
          <ShareButton datatestid={ `${index}-horizontal-share-btn` } />
          <FavoriteButton datatestid={ `${index}-horizontal-favorite-btn` } />
        </div>
        <p>
          { alcoholicOrNot }
        </p>
      </div>
    </Card>

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

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import './CookedAndFavoriteCard.css';
import '../pages/CookedRecipies.css';

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
    <Card className="recip-card">
      <Link to={ `/${type}s/${id}` }>
        <Card.Img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="foto-da-api-"
          className="image-recipes"
        />
      </Link>
      <div>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
          { `${area} - ${category}` }
        </p>
        <Link to={ `/${type}s/${id}` }>
          <Card.Title
            className="title-recip-cards"
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </Card.Title>
        </Link>
        <div className="toptext-icon">
          <ShareButton
            datatestid={ `${index}-horizontal-share-btn` }
            id={ id }
            type={ `${type}s` }
          />
          <FavoriteButton
            id={ id }
            type={ type }
            datatestid={ `${index}-horizontal-favorite-btn` }
          />
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

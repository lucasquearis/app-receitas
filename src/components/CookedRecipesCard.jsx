import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ShareButton from './ShareButton';
import '../pages/CookedRecipies.css';

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
        <div className="toptext-icon">
          <p className="p-cooked-recip" data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot }
            { `${area} - ${category}` }
          </p>
          <ShareButton
            id={ id }
            type={ `${type}s` }
            datatestid={ `${index}-horizontal-share-btn` }
          />
        </div>
        <Link to={ `/${type}s/${id}` }>
          <Card.Title
            className="title-recip-cards"
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </Card.Title>
        </Link>
        <p
          className="p-cooked-recip"
          data-testid={ `${index}-horizontal-done-date` }
        >
          { doneDate }
        </p>
        {tags.slice(0, lenghtTag).map((tag) => (
          <p
            className="p-cooked-recip"
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>))}
      </div>
    </Card>

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

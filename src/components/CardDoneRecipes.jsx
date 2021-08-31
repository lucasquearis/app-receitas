import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';

export default function CardDoneRecipes({
  index,
  thumb,
  title,
  category,
  area,
  date,
  tags,
  type,
  id,
  tagName,
}) {
  return (
    <div>
      <Link
        key="first"
        to={ `${type}/${id}` }
      >
        <Card>
          <Card.Img
            key="second"
            data-testid={ `${index}-horizontal-image` }
            src={ thumb }
            alt={ title }
          />
          <Card.Body>
            <Card.Title
              key="third"
              data-testid={ `${index}-horizontal-name` }
            >
              { title }
            </Card.Title>
            <Card.Text
              // category
              key="fourth"
              data-testid={ `${index}-horizontal-top-text` }
            >
              { category }
            </Card.Text>
            <Card.Text>
              {/* area */}
              { area }
            </Card.Text>
            <Card.Text
              // date
              key="fifth"
              data-testid={ `${index}-horizontal-done-date` }
            >
              { date }
            </Card.Text>
            <Card.Text
              // tags
              key="sixth"
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              { tags.map((tag, indexTag) => (<span key={ indexTag }>{ tag }</span>)) }
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <ShareButton
        type={ type }
        id={ id }
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </div>
  );
}

CardDoneRecipes.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tagName: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
};

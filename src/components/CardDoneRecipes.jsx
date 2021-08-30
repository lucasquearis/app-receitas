import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function CardItems({ title, thumb, index, id, text, date, tags, share }) {
  const location = useLocation();
  const currentPage = location.pathname;
  const todayDate = () => {
    const day = new Date();
    return `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
  };
  const tagName = true;

  return (
    <Link to={ `${currentPage}/${id}` }>
      <Card>
        <Card.Img
          data-testid={ `${index}-horizontal-image` }
          src={ thumb }
          alt={ title }
        />
        <Card.Body>
          <Card.Title
            data-testid={ `${index}-horizontal-name` }
          >
            { title }
          </Card.Title>
          <Card.Text
            data-testid={ `${index}-horizontal-top-text` }
            date={ date }
          >
            { todayDate }
          </Card.Text>
          <Card.Text
            data-testid={ `${index}-horizontal-top-text` }
          >
            { text }
          </Card.Text>
          <Card.Text
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            { tags }
          </Card.Text>
          <Card.Img
            data-testid={ `${index}-horizontal-share-btn` }
          >
            { share }
          </Card.Img>
        </Card.Body>
      </Card>
    </Link>
  );
}

CardItems.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  share: PropTypes.func.isRequired,
};

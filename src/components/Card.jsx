import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export default function CardItems({ title, thumb, index, id }) {
  const location = useLocation();
  const currentPage = location.pathname;
  return (
    <Link to={ `${currentPage}/${id}` }>
      <Card
        data-testid={ `${index}-recipe-card` }
      >
        <Card.Img
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt={ title }
        />
        <Card.Body>
          <Card.Title
            data-testid={ `${index}-card-name` }
          >
            { title }
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

CardItems.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

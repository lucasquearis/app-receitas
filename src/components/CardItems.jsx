import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function CardItems({ title, thumb, index, type, onClick }) {
  return (
    <Card
      onClick={ onClick }
      data-testid={ `${index}-${type}-card` }
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
  );
}

CardItems.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

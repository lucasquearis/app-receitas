import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function CardItems({ title, thumb, index, type, onClick }) {
  return (
    <Card
      className="border border-dark m-3"
      onClick={ onClick }
      data-testid={ `${index}-${type}-card` }
    >
      <Card.Img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        alt={ title }
      />
      <Card.Body className="bg-color">
        <Card.Text
          className="h5 bg-color"
          data-testid={ `${index}-card-name` }
        >
          { title }
        </Card.Text>
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

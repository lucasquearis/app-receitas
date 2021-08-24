import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function RecipeCard({ title, thumb, index }) {
  return (
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
  );
}

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './Card.css';

function DrinkCard({ drink: { strDrink, strDrinkThumb }, index }) {
  return (
    <Card className="food-card" data-testid={ `${index}-recipe-card` }>
      <Card.Img
        className="food-card-img"
        data-testid={ `${index}-card-img` }
        src={ strDrinkThumb }
        alt="foodandDrinkImages"
      />
      <Card.Title data-testid={ `${index}-card-name` }>
        { strDrink }
      </Card.Title>
    </Card>
  );
}

DrinkCard.propTypes = ({
  item: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}).isRequired;

export default DrinkCard;

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './Card.css';

function FoodCard({ food: { strMeal, strMealThumb }, index }) {
  return (
    <Card className="food-card" data-testid={ `${index}-recipe-card` }>
      <Card.Img
        className="food-card-img"
        data-testid={ `${index}-card-img` }
        src={ strMealThumb }
        alt="foodandDrinkImages"
      />
      <Card.Title data-testid={ `${index}-card-name` }>
        { strMeal }
      </Card.Title>
    </Card>
  );
}

FoodCard.propTypes = ({
  item: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}).isRequired;

export default FoodCard;

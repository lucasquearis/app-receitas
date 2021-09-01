import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './Card.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  foodFilterByIngredientListFetch,
  foodHandleClickIngredient,
} from '../redux/actions/actionFood';

function FoodIngredientCard({ title: { strIngredient }, index }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(foodHandleClickIngredient(true));
    dispatch(foodFilterByIngredientListFetch(strIngredient));
  };

  return (
    <Link to="/comidas" onClick={ handleClick }>
      <Card data-testid={ `${index}-ingredient-card` }>
        <Card.Img
          data-testid={ `${index}-card-img` }
          src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          alt="foodandDrinkImages"
        />
        <Card.Title data-testid={ `${index}-card-name` }>
          { strIngredient }
        </Card.Title>
      </Card>
    </Link>
  );
}

FoodIngredientCard.propTypes = ({
  item: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}).isRequired;

export default FoodIngredientCard;

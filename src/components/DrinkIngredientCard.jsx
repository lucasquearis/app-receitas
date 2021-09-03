import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './Card.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  drinkFilterByIngredientListFetch,
  drinkHandleClickIngredient,
} from '../redux/actions/actionDrink';

function DrinkIngredientCard({ title: { strIngredient1 }, index }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(drinkHandleClickIngredient(true));
    dispatch(drinkFilterByIngredientListFetch(strIngredient1));
  };

  return (
    <Link to="/bebidas" onClick={ handleClick }>
      <Card className="food-card" data-testid={ `${index}-ingredient-card` }>
        <Card.Img
          className="food-card-img"
          data-testid={ `${index}-card-img` }
          src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
          alt="foodandDrinkImages"
        />
        <Card.Title data-testid={ `${index}-card-name` }>
          { strIngredient1 }
        </Card.Title>
      </Card>
    </Link>
  );
}

DrinkIngredientCard.propTypes = ({
  item: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}).isRequired;

export default DrinkIngredientCard;

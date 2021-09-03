import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { TOGGLE_FILTER } from '../../redux/reducers/recipesReducer';
import './style.css';

const ToggleButtons = () => {
  const dispatch = useDispatch();

  const handleClick = (str) => dispatch({
    type: TOGGLE_FILTER,
    payload: str,
  });

  return (
    <div className="done-recipes-btn">
      <Button
        size="lg"
        data-testid="filter-by-all-btn"
        onClick={ () => handleClick('All') }
      >
        All
      </Button>
      <Button
        size="lg"
        data-testid="filter-by-food-btn"
        onClick={ () => handleClick('comida') }
      >
        Food
      </Button>
      <Button
        size="lg"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleClick('bebida') }
      >
        Drinks
      </Button>
    </div>
  );
};

export default ToggleButtons;

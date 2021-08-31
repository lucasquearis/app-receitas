import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { drinkHandleClickIngredient } from '../redux/actions/actionDrink';
import { foodHandleClickIngredient } from '../redux/actions/actionFood';
import './Footer.css';

function Footer() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(drinkHandleClickIngredient(false));
    dispatch(foodHandleClickIngredient(false));
  };
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas" onClick={ handleClick }>
        <button type="button" className="buttons">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" className="buttons">
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas" onClick={ handleClick }>
        <button type="button" className="buttons">
          <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/icons/exploreDrinks.png';
import mealIcon from '../../images/icons/exploreFood.png';
import listIcon from '../../images/icons/ingredientsFood.png';
import surpriseIcon from '../../images/icons/surpriseMe.png';
import mapIcon from '../../images/icons/location.png';
import './style.css';

const ExploreCard = ({ type }) => {
  const history = useHistory();
  let text;
  let icon;
  let path;
  let testId;

  if (type === 'food') {
    text = 'Explorar Comidas';
    icon = mealIcon;
    path = '/explorar/comidas';
    testId = 'explore-food';
  } else if (type === 'drink') {
    text = 'Explorar Bebidas';
    icon = drinkIcon;
    path = '/explorar/bebidas';
    testId = 'explore-drinks';
  } else if (type === 'ingredientFood') {
    text = 'Por Ingredientes';
    icon = listIcon;
    path = '/explorar/comidas/ingredientes';
    testId = 'explore-by-ingredient';
  } else if (type === 'ingredientDrink') {
    text = 'Por Ingredientes';
    icon = listIcon;
    path = '/explorar/bebidas/ingredientes';
    testId = 'explore-by-ingredient';
  } else if (type === 'local') {
    text = 'Por Local de Origem';
    icon = mapIcon;
    path = '/explorar/comidas/area';
    testId = 'explore-by-area';
  } else {
    text = 'Me Surpreenda!';
    icon = surpriseIcon;
    path = false;
    testId = 'explore-surprise';
  }

  const clickHandler = () => {
    if (path) history.push(path);
    else if (type === 'surpriseMeFood') {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((data) => data.meals[0].idMeal)
        .then((idMeal) => history.push(`/comidas/${idMeal}`));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((data) => data.drinks[0].idDrink)
        .then((idDrink) => history.push(`/bebidas/${idDrink}`));
    }
  };

  return (
    <button
      type="button"
      onClick={ clickHandler }
      data-testid={ testId }
      className="btn"
    >
      <img src={ icon } alt="" className="icon" />
      <p>{text}</p>
    </button>
  );
};

ExploreCard.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreCard;

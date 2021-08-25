import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

const DrinkOrFood = ({ food }) => {
  const { drinkData, foodData, filter } = useContext(RecipesContext);
  const endNumber = 12;
  const foodOrDrink = food ? 'Meal' : 'Drink';
  const filter2data = (request) => {
    const saveData = filter === '' ? request : request
      .filter(({ strCategory }) => filter === strCategory);
    return saveData.slice(0, endNumber);
  };
  const show = food === true ? filter2data(foodData) : filter2data(drinkData);
  return (
    show.length > 1 ? show.map((item, index) => (
      <Link
        to={ `/comidas/${item.id}` }
        key={ index }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ item[`str${foodOrDrink}Thumb`] }
          alt="recipe"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{item[`str${foodOrDrink}`]}</span>
      </Link>
    ))
      : (
        <div>
          <img src={ show[`str${foodOrDrink}Thumb`] } alt="recipe" />
          <span>{show[`str${foodOrDrink}`]}</span>
        </div>
      )
  );
};

DrinkOrFood.propTypes = {
  food: PropTypes.bool.isRequired,
};

export default DrinkOrFood;

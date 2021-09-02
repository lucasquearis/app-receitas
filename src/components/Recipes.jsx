import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import Card from './card';

const DrinkOrFood = ({ onClick }) => {
  const { drinkData,
    foodData,
    ingredientData, food, ingredient } = useContext(RecipesContext);
  const foodOrDrink = food ? 'Meal' : 'Drink';
  const comidasOrBebidas = food ? 'comidas' : 'bebidas';
  const filter2data = () => {
    if (ingredient) {
      return ingredientData;
    }
    return food ? foodData : drinkData;
  };
  const show = filter2data();
  return (
    show.length > 1 ? show.map((item, index) => (
      <Link
        to={
          ingredient ? `/${comidasOrBebidas}`
            : `/${comidasOrBebidas}/${item[`id${foodOrDrink}`]}`
        }
        onClick={ onClick }
        key={ index }
      >
        <Card
          item={ item }
          foodOrDrink={ foodOrDrink }
          index={ index }
          ingredient={ ingredient }
        />
      </Link>
    ))
      : <Card item={ show[0] } foodOrDrink={ foodOrDrink } index="0" />
  );
};

DrinkOrFood.propTypes = {
  onClick: PropTypes.func,
};

DrinkOrFood.defaultProps = {
  onClick: () => {},
};

export default DrinkOrFood;

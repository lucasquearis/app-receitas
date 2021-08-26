import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import FoodFilterAPI from '../service/foodFilterAPI';
import FoodAPI from '../service/foodAPI';
import DrinksAPI from '../service/drinksAPI';
import DrinksFilterAPI from '../service/drinksFilterAPI';
import Card from './card';

const test2API = (food, filter) => {
  if (food) {
    return filter === '' ? FoodAPI() : FoodFilterAPI();
  }
  return filter === '' ? DrinksAPI() : DrinksFilterAPI();
};

const DrinkOrFood = ({ food }) => {
  const { drinkData, foodData, filter } = useContext(RecipesContext);
  const endNumber = 12;
  const foodOrDrink = food ? 'Meal' : 'Drink';
  const comidasOrBebidas = food ? 'comidas' : 'bebidas';
  const filter2data = () => {
    if (food) {
      test2API(food, filter);
      const saveData = foodData !== null ? [...foodData].slice(0, endNumber) : [];
      return saveData;
    }
    test2API(food, filter);
    const saveData = drinkData !== null ? [...drinkData].slice(0, endNumber) : [];
    return saveData;
  };
  const show = filter2data();
  return (
    show.length > 1 ? show.map((item, index) => (
      <Link
        to={ `/${comidasOrBebidas}/${item[`id${foodOrDrink}`]}` }
        key={ index }
      >
        <Card
          item={ item }
          foodOrDrink={ foodOrDrink }
          index={ index }
        />
      </Link>
    ))
      : <Card item={ show[0] } foodOrDrink={ foodOrDrink } index="0" />
  );
};

DrinkOrFood.propTypes = {
  food: PropTypes.bool.isRequired,
};

export default DrinkOrFood;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import FoodFilterAPI from '../service/foodFilterAPI';
import FoodAPI from '../service/foodAPI';
import DrinksAPI from '../service/drinksAPI';
import DrinksFilterAPI from '../service/drinksFilterAPI';
import Card from './card';
import ingredientesAPI from '../service/IngredientAPI';

const test2API = (food, filter, ingredientes, ingredientesData) => {
  if (ingredientes && ingredientesData.length === 0) {
    ingredientesAPI(food);
    return null;
  } if (food) {
    return filter === '' ? FoodAPI() : FoodFilterAPI();
  }
  return filter === '' ? DrinksAPI() : DrinksFilterAPI();
};

const DrinkOrFood = ({ food, ingredientes, onClick }) => {
  const { drinkData,
    foodData,
    filter,
    ingredientesData } = useContext(RecipesContext);
  const endNumber = 12;
  const foodOrDrink = food ? 'Meal' : 'Drink';
  const comidasOrBebidas = food ? 'comidas' : 'bebidas';
  const filter2data = () => {
    test2API(food, filter, ingredientes, ingredientesData);
    if (ingredientes) {
      return [...ingredientesData].slice(0, endNumber);
    }
    if (food) {
      const saveData = foodData !== null ? [...foodData].slice(0, endNumber) : [];
      return saveData;
    }
    const saveData = drinkData !== null ? [...drinkData].slice(0, endNumber) : [];
    return saveData;
  };
  const show = filter2data();
  return (
    show.length > 1 ? show.map((item, index) => (
      <Link
        to={
          ingredientes ? `/${comidasOrBebidas}`
            : `/${comidasOrBebidas}/${item[`id${foodOrDrink}`]}`
        }
        onClick={ onClick }
        key={ index }
      >
        <Card
          item={ item }
          foodOrDrink={ foodOrDrink }
          index={ index }
          ingredientes={ ingredientes }
        />
      </Link>
    ))
      : <Card item={ show[0] } foodOrDrink={ foodOrDrink } index="0" />
  );
};

DrinkOrFood.propTypes = {
  food: PropTypes.bool.isRequired,
  ingredientes: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

DrinkOrFood.defaultProps = {
  onClick: () => {},
};

export default DrinkOrFood;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function RecipesProvider({ children }) {
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [drinkIngredientSelected, setDrinkIngredientSelected] = useState('');
  const [foodIngredientSelected, setFoodIngredientSelected] = useState('');
  const [display, setDisplay] = useState([]);
  const [displayFood, setDisplayFood] = useState([]);

  const drinkIngredientClick = async (ingredient) => {
    const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await result.json();
    return data;
  };

  const foodIngredientClick = async (ingredient) => {
    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await result.json();
    return data;
  };

  const removeDisplayList = () => {
    setDisplay([]);
    setDisplayFood([]);
  };

  const removeRandomList = () => {
    setRandomDrink([]);
    setRandomFood([]);
  };

  const getRandomDrink = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    setRandomDrink(data.drinks);
  };

  const getRandomFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    setRandomFood(data.meals);
  };

  const providerState = {
    // Foods:
    randomFood,
    foodIngredients,
    foodIngredientClick,
    foodIngredientSelected,
    setFoodIngredientSelected,
    displayFood,
    setDisplayFood,
    getRandomFood,
    // Drinks:
    randomDrink,
    drinkIngredients,
    drinkIngredientClick,
    drinkIngredientSelected,
    setDrinkIngredientSelected,
    getRandomDrink,
    // Others:
    display,
    setDisplay,
    removeDisplayList,
    removeRandomList,
  };

  useEffect(() => {
    const getFoodIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setFoodIngredients(data.meals);
    };
    const getDrinkIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setDrinkIngredients(data.drinks);
    };
    getDrinkIngredients();
    getFoodIngredients();
  }, []);

  return (
    <myContext.Provider value={ providerState }>
      {children}
    </myContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;

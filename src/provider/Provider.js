import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/context';

function Provider({ children }) {
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  useEffect(() => {
    const response = async () => {
      const api = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(api).then((data) => data.json());
      setMeal(meals);
    };
    response();
  }, []);

  useEffect(() => {
    const response = async () => {
      const api = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(api).then((data) => data.json());
      setDrink(drinks);
    };
    response();
  }, []);

  const contextValue = {
    meal,
    drink,
  };
  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinkContext from '../context/DrinkContext';
import { fetchCocktails, fetchCocktailCategories } from '../services/cocktailAPI';

export default function DrinkProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCocktails().then((data) => {
      setDrinks(data.drinks);
    });
    fetchCocktailCategories().then((data) => {
      setCategories(data.drinks);
    });
  }, []);

  return (
    <DrinkContext.Provider
      value={ {
        drinks,
        setDrinks,
        categories,
        setCategories,
      } }
    >
      {children}
    </DrinkContext.Provider>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

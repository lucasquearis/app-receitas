import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import { fetchDrinksApi, fetchCategoriesDrinksApi } from '../services/fetchDrinksApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);

  useEffect(() => {
    fetchDrinksApi().then((data) => {
      setDrinks(data.drinks);
    });
  }, []);

  useEffect(() => {
    fetchCategoriesDrinksApi().then((categories) => {
      setCategoriesDrinks(categories.drinks);
    });
  }, []);

  const contextValue = {
    drinks,
    categoriesDrinks,
    setDrinks,
  };

  return (
    <DrinksContext.Provider value={ contextValue }>
      {children}
    </DrinksContext.Provider>
  );
};

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import { fetchDrinksApi, fetchCategoriesDrinksApi } from '../services/fetchDrinksApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState({
    searchText: '',
    search: '',
  });
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [drinksByCategories, setDrinksByCategories] = useState(false);

  useEffect(() => {
    fetchDrinksApi(drinkFilter).then((data) => {
      setDrinks(data.drinks);
    });
  }, [drinkFilter]);

  useEffect(() => {
    fetchCategoriesDrinksApi().then((categories) => {
      setCategoriesDrinks(categories.drinks);
    });
  }, []);

  const contextValue = {
    drinks,
    drinkFilter,
    setDrinkFilter,
    categoriesDrinks,
    setDrinks,
    drinksByCategories,
    setDrinksByCategories,
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

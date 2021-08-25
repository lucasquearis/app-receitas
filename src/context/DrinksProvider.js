import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import fetchDrinksApi from '../services/fetchDrinksApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState({
    searchText: '',
    search: '',
  });

  useEffect(() => {
    fetchDrinksApi(drinkFilter).then((data) => {
      setDrinks(data.drinks);
    });
  }, [drinkFilter]);

  const contextValue = {
    drinks,
    drinkFilter,
    setDrinkFilter,
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

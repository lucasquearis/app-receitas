import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import fetchDrinksApi from '../services/fetchDrinksApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetchDrinksApi().then((data) => {
      setDrinks(data.drinks);
    });
  }, []);

  const contextValue = {
    drinks,
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

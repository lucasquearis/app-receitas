import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import fetchDrinksApi from '../services/fetchDrinksApi';
import fetchDrinkDetailsApi from '../services/fetchDrinkDetailsApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [DrinkDetailsId, setDrinkDetailsId] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);

  useEffect(() => {
    fetchDrinksApi().then((data) => {
      setDrinks(data.drinks);
    });
  }, []);

  useEffect(() => {
    fetchDrinkDetailsApi(DrinkDetailsId).then((data) => setDrinkDetails(data.meals));
  }, [DrinkDetailsId]);

  const contextValue = {
    drinks,
    DrinkDetailsId,
    setDrinkDetailsId,
    drinkDetails,
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

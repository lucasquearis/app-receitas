import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import fetchDrinksApi from '../services/fetchDrinksApi';
import fetchDrinkDetailsApi from '../services/fetchDrinkDetailsApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [drinkDetailsId, setDrinkDetailsId] = useState('');
  const [drinkDetails, setDrinkDetails] = useState([]);
  console.log(drinkDetailsId);

  useEffect(() => {
    fetchDrinksApi().then((data) => {
      setDrinks(data.drinks);
    });
  }, []);

  useEffect(() => {
    fetchDrinkDetailsApi(drinkDetailsId).then((data) => setDrinkDetails(data.drinks));
  }, [drinkDetailsId]);

  const contextValue = {
    drinks,
    drinkDetailsId,
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

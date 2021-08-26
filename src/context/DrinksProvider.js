import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import { fetchDrinksApi, fetchCategoriesDrinksApi } from '../services/fetchDrinksApi';
import fetchDrinkDetailsApi from '../services/fetchDrinkDetailsApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [drinkDetailsId, setDrinkDetailsId] = useState('');
  const [drinkDetails, setDrinkDetails] = useState([]);
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

  useEffect(() => {
    fetchDrinkDetailsApi(drinkDetailsId).then((data) => setDrinkDetails(data.drinks));
  }, [drinkDetailsId]);

  const contextValue = {
    drinks,
    drinkDetailsId,
    setDrinkDetailsId,
    drinkDetails,
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

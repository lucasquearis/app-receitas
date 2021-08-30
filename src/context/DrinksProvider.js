import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';
import { fetchDrinksApi,
  fetchCategoriesDrinksApi, fetchIngredients } from '../services/fetchDrinksApi';

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState({
    searchText: '',
    search: '',
  });
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [drinksByCategories, setDrinksByCategories] = useState(false);
  const [randomDrinks, setRandomDrinks] = useState('');
  const [ingredients, setIngredients] = useState([]);

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
    fetchIngredients().then((data) => {
      setIngredients(data.drinks);
    });
  }, []);

  const contextValue = {
    drinks,
    drinkDetails,
    setDrinkDetails,
    drinkFilter,
    setDrinkFilter,
    categoriesDrinks,
    setDrinks,
    drinksByCategories,
    setDrinksByCategories,
    randomDrinks,
    setRandomDrinks,
    ingredients,
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

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [dataMeals, setDataMeals] = useState('');
  const [dataDrinks, setDataDrinks] = useState('');
  const [searchDataMeals, setSearchDataMeals] = useState([]);
  const [searchDataDrinks, setSearchDataDrinks] = useState([]);
  const [btnCategoryMeals, setBtnCategoryMeals] = useState('');
  const [btnCategoryDrinks, setBtnCategoryDrinks] = useState('');
  const [listCategoryMeals, setListCategoryMeals] = useState();
  const [listCategoryDrinks, setListCategoryDrinks] = useState();
  const [recipesInProgress, setRecipesInProgress] = useState({
    cocktails: {},
    meals: {} });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataRandomMeals, setDataRandomMeals] = useState('');
  const [dataRandomDrinks, setDataRandomDrinks] = useState('');

  const context = {
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    searchDataMeals,
    setSearchDataMeals,
    searchDataDrinks,
    setSearchDataDrinks,
    btnCategoryMeals,
    setBtnCategoryMeals,
    btnCategoryDrinks,
    setBtnCategoryDrinks,
    listCategoryMeals,
    setListCategoryMeals,
    listCategoryDrinks,
    setListCategoryDrinks,
    recipesInProgress,
    setRecipesInProgress,
    loading,
    setLoading,
    dataRandomMeals,
    setDataRandomMeals,
    dataRandomDrinks,
    setDataRandomDrinks,
    favorites,
    setFavorites,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

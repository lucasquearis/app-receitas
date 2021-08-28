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
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);


  const context = {
    loading,
    setLoading,
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

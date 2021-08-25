import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [dataMeals, setDataMeals] = useState('');
  const [dataDrinks, setDataDrinks] = useState('');
  const [btnCategoryMeals, setBtnCategoryMeals] = useState('');
  const [btnCategoryDrinks, setBtnCategoryDrinks] = useState('');
  const [listCategoryMeals, setListCategoryMeals] = useState();
  const [listCategoryDrinks, setListCategoryDrinks] = useState();

  const context = {
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    btnCategoryMeals,
    setBtnCategoryMeals,
    btnCategoryDrinks,
    setBtnCategoryDrinks,
    setListCategoryMeals,
    listCategoryMeals,
    setListCategoryDrinks,
    listCategoryDrinks,
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

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
  const [recipesDone, setRecipesDone] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataRandomMeals, setDataRandomMeals] = useState('');
  const [dataRandomDrinks, setDataRandomDrinks] = useState('');
  const [dataExploreIngredientsMeals, setDataExploreIngredientsMeals] = useState('');
  const [dataExploreIngredientsDrinks, setDataExploreIngredientsDrinks] = useState('');
  const [filterByIngredientsMeals, setFilterByIngredientsMeals] = useState('');
  const [filterByIngredientsDrinks, setFilterByIngredientsDrinks] = useState('');
  const [dataArea, setDataArea] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

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
    recipesDone,
    setRecipesDone,
    loading,
    setLoading,
    dataRandomMeals,
    setDataRandomMeals,
    dataRandomDrinks,
    setDataRandomDrinks,
    favorites,
    setFavorites,
    dataExploreIngredientsMeals,
    setDataExploreIngredientsMeals,
    dataExploreIngredientsDrinks,
    setDataExploreIngredientsDrinks,
    filterByIngredientsMeals,
    setFilterByIngredientsMeals,
    filterByIngredientsDrinks,
    setFilterByIngredientsDrinks,
    dataArea,
    setDataArea,
    selectedArea,
    setSelectedArea,
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

import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '.';
import { fetchAPI,
  fetchRandomRecipe,
  fetchRecipeByArea,
  fetchListByFilter } from '../services/API';

import useFavorite from '../hooks/useFavorite';
import useDone from '../hooks/useDone';
import useInProgress from '../hooks/useInProgress';

function Provider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [inputText, setInputText] = useState('');
  const [apiData, setApiData] = useState(null);
  const [radioValue, setRadioValue] = useState('s');
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [favoriteList, setFavoriteList] = useFavorite([]);
  const [doneRecipes, setDoneRecipes] = useDone([]);
  const [inProgressList, setInProgressList] = useInProgress();
  const [activeArea, setActiveArea] = useState('All');
  const [areasApi, setAreasApi] = useState(null);
  const [recipes, setRecipes] = useState({ recipe: null });
  const requestApiData = useCallback(async (URL) => {
    const searchType = radioValue === 'i' || radioValue === 'c' ? 'filter' : 'search';
    setIsFetching(true);
    setApiData([await fetchAPI(URL, searchType, radioValue, inputText)]);
    setIsFetching(false);
  }, [inputText, radioValue]);

  useEffect(() => {
    const fetching = async () => {
      setRecipes(await fetchRecipeByArea(activeArea));
      setAreasApi(await fetchListByFilter('themealdb', 'a'));
    };
    fetching();
  }, [activeArea]);

  async function requestRandomRecipe(endpoint) {
    setIsFetching(true);
    setApiData([await fetchRandomRecipe(endpoint)]);
    setIsFetching(false);
  }

  const contextValue = {
    apiData,
    inputText,
    setInputText,
    setRadioValue,
    isFetching,
    requestApiData,
    setToggle,
    toggle,
    email,
    setEmail,
    favoriteList,
    setFavoriteList,
    doneRecipes,
    setDoneRecipes,
    inProgressList,
    setInProgressList,
    requestRandomRecipe,
    activeArea,
    setActiveArea,
    areasApi,
    recipes,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

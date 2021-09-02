import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UseUserHook from '../Hooks/UseUserHook';
import recipesHooks from '../Hooks/recipesHooks';
import SingleRecipeHook from '../Hooks/SingleRecipeHook';
import DoneRecipeHook from '../Hooks/DoneRecipeHook';
import ModalHook from '../Hooks/ModalHook';
import { fetchApiCategory, fetchApiRecipes } from '../Helpers/fetchApi';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const [recipeCategory, setRecipeCategory] = useState({});
  const [recipes, setRecipes] = useState([]);

  const { singleRecipe, handleRecipe, handleFav, fav } = SingleRecipeHook();
  const { handleStart, doneRecipe, inProgress, handleBtnType } = DoneRecipeHook();
  const { handleModal } = ModalHook();
  const { searchRecipes } = recipesHooks();
  const { Login, redirect, setRedirect } = UseUserHook();
  const history = useHistory();
  const search = 'search.php?s=';
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas') || pathname === '/';
  const urlRender = currentRout ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';
  const fetchApi = async (url, type, searchInput = '') => {
    const request = await fetch(`${url}${type}${searchInput}`);
    const response = await request.json();
    return setRecipes(response.meals || response.drinks);
  };
  if (recipes.length === 0) {
    fetchApi(urlRender, search);
  }
  useEffect(() => {
    const initialFetch = async () => {
      setRecipeCategory(await fetchApiCategory());
      setRecipes(await fetchApiRecipes());
    };
    initialFetch();
  }, []);

  const ContProps = {
    recipes,
    searchRecipes,
    Login,
    redirect,
    setRecipes,
    setRedirect,
    singleRecipe,
    handleRecipe,
    handleStart,
    doneRecipe,
    inProgress,
    handleBtnType,
    handleModal,
    handleFav,
    fav,
    fetchApi,

    recipeCategory,
  };

  return (
    <ContextApp.Provider value={ { ...ContProps } }>
      {children}
    </ContextApp.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useLogin from '../hooks/useLogin';
import useRecipes from '../hooks/useRecipes';

export const RecipesContext = createContext();

export const ContextProvider = ({ children }) => {
  const { loginHandle, redirect } = useLogin();
  const { getRecipes, recipes, history, tag } = useRecipes();

  return (
    <RecipesContext.Provider
      value={ { loginHandle, redirect, getRecipes, recipes, history, tag } }
    >
      {children}
    </RecipesContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

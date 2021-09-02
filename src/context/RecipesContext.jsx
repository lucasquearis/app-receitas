import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useLogin from '../hooks/useLogin';
import useRecipes from '../hooks/useRecipes';
import useFilters from '../hooks/useFilters';
import useDoneRecipes from '../hooks/useDoneRecipes';

export const RecipesContext = createContext();

export const ContextProvider = ({ children }) => {
  const { loginHandle, redirect } = useLogin();
  const { getRecipes, recipes, history, tag, getByCategory } = useRecipes();
  const { newRecipeDone, dones, filter, filteredDones } = useDoneRecipes();
  const { filters } = useFilters();

  return (
    <RecipesContext.Provider
      value={ {
        loginHandle,
        redirect,
        getRecipes,
        recipes,
        history,
        tag,
        filters,
        getByCategory,
        newRecipeDone,
        dones,
        filter,
        filteredDones,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

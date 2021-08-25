import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useLogin from '../hooks/useLogin';

export const RecipesContext = createContext();

export const ContextProvider = ({ children }) => {
  const { loginHandle, redirect } = useLogin();

  return (
    <RecipesContext.Provider value={ { loginHandle, redirect } }>
      {children}
    </RecipesContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

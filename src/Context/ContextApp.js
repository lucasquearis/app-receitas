import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import LoginHook from '../Hooks/LoginHook';

import recipesHooks from '../Hooks/recipesHooks';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes } = recipesHooks();
  const {
    handleInput,
    Login,
    disabled,
    handleClick,
    redirect,
    setRedirect } = LoginHook();

  const ContProps = {
    recipes,
    searchRecipes,
    disabled,
    handleInput,
    Login,
    handleClick,
    redirect,
    setRedirect,
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

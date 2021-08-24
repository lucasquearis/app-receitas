import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import recipesHooks from '../Hooks/recipesHooks';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => {
  const { searchRecipes, recipes } = recipesHooks();

  const ContProps = {
    recipes,
    searchRecipes,
  };

  return (
    <ContextApp.Provider value={ ContProps }>
      {children}
    </ContextApp.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

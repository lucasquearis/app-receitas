import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ContextRecipes = createContext();

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const showAlert = (callback, msg) => {
    callback(msg);
  };

  const contextValue = {
    showAlert,
    recipes,
    setRecipes,
  };

  return (
    <ContextRecipes.Provider value={ contextValue }>
      {children}
    </ContextRecipes.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;

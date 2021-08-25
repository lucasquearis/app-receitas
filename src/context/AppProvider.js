import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [recipeList, setRecipeList] = useState();

  return (
    <AppContext.Provider value={ { recipeList, setRecipeList } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showBar, setShowBar] = useState(false);

  const contextValue = {
    selectedCategory,
    setSelectedCategory,
    showBar,
    setShowBar,
    recipes,
    setRecipes,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

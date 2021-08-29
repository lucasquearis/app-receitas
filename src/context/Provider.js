import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [recipes, setRecipes] = useState([]);

  const contextValue = {
    isLoading,
    recipes,
    selectedArea,
    selectedCategory,
    selectedIngredient,
    setIsLoading,
    setRecipes,
    setSelectedArea,
    setSelectedCategory,
    setSelectedIngredient,
    setShowBar,
    showBar,
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

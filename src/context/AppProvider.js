import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [recipeList, setRecipeList] = useState();
  const [categoriesList, setCategoriesList] = useState(null);
  const [filterRecipes, setFilterRecipes] = useState('all');
  const [from, setFrom] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState();
  const [fvtRecipes, setFvtRecipes] = useState([]);

  const context = {
    recipeList,
    categoriesList,
    setRecipeList,
    setCategoriesList,
    filterRecipes,
    setFilterRecipes,
    fvtRecipes,
    setFvtRecipes,
    from,
    setFrom,
    recipeDetails,
    setRecipeDetails,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes
    .oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

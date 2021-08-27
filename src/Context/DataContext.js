import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [recipesData, setRecipesData] = useState([]);
  const [selIngredient, setSelIngredient] = useState('');
  const [exploreData, setExploreData] = useState([]);
  const [detailsData, setDetailsData] = useState([]);
  const [fav, setFav] = useState([]);
  const [recommendationsData, setRecommendationsData] = useState([]);
  const contextValue = {
    recipesData,
    setRecipesData,
    exploreData,
    setExploreData,
    detailsData,
    setDetailsData,
    recommendationsData,
    setRecommendationsData,
    selIngredient,
    setSelIngredient,
    fav,
    setFav,
  };

  return (
    <DataContext.Provider value={ contextValue }>
      { children }
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

DataProvider.propTypes = {
  children: node.isRequired,
};

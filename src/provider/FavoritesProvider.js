import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from '../context/FavoritesContext';

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (favorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={ {
        favorites,
        setFavorites,
      } }
    >
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

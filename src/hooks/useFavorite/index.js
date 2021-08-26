import { useState, useEffect } from 'react';

function useFavorite() {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const key = 'favoriteRecipes';
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setFavoriteList(data);
  }, []);

  const handleNewFavoriteList = (recipe) => {
    const key = 'favoriteRecipes';
    const data = JSON.parse(localStorage.getItem(key));
    const isFavorite = !!favoriteList.find((item) => item.id === recipe.id);
    if (isFavorite) {
      const value = data.filter((item) => item.id !== recipe.id);
      localStorage.setItem(key, JSON.stringify(value));
      setFavoriteList(value);
    } else {
      const value = data ? [...data, recipe] : [recipe];
      localStorage.setItem(key, JSON.stringify(value));
      setFavoriteList(value);
    }
  };

  return [favoriteList, handleNewFavoriteList];
}

export default useFavorite;

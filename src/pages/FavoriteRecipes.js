import React, { useState, useContext, useEffect } from 'react';
import FoodContext from '../context/FoodContext';
import FavoriteFoodCard from '../components/FavoriteFoodCard';
import FavoriteDrinkCard from '../components/FavoriteDrinkCard';
import profileIcon from '../images/profileIcon.svg';

const FavoriteRecipes = () => {
  const { changed } = useContext(FoodContext);
  const [storage, setStorage] = useState([]);
  console.log(changed);

  useEffect(() => {
    const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setStorage(actualStorage);
  }, [changed]);

  return (
    <div>
      <div>
        <button type="button">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
        <h2 data-testid="page-title">Receitas Favoritas</h2>
      </div>
      { storage.map((recipe, index) => (recipe.type === 'comida'
        ? <FavoriteFoodCard recipe={ recipe } index={ index } />
        : <FavoriteDrinkCard recipe={ recipe } index={ index } />))}
    </div>
  );
};

export default FavoriteRecipes;

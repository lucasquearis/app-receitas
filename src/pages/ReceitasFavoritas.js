import React, { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const getAllFavorite = () => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const updateFavorite = (updatedRecipes) => {
    setFavoriteRecipes(updatedRecipes);
  };

  const showFood = () => {
    const allFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const onlyFood = allFavorite.filter((recipe) => recipe.type === 'comida');
    setFavoriteRecipes(onlyFood);
  };

  const showDrinks = () => {
    const allFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const onlyDrinks = allFavorite.filter((recipe) => recipe.type === 'bebida');
    setFavoriteRecipes(onlyDrinks);
  };

  useEffect(() => {
    getAllFavorite();
  }, []);

  return (
    <div>
      <Header titulo="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getAllFavorite }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ showFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ showDrinks }
      >
        Drinks
      </button>
      {favoriteRecipes ? (
        favoriteRecipes.map((recipe, index) => (
          <FavoriteCard
            key={ recipe.name }
            recipe={ recipe }
            updateFavorite={ updateFavorite }
            index={ index }
          />
        ))) : null }
    </div>
  );
}

export default ReceitasFavoritas;

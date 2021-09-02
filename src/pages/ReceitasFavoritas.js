import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import './receitasFeitas.css';

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
    <div className="main-container">
      <Header titulo="Receitas Favoritas" />
      <div className="favorite-btn-container">
        <Button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getAllFavorite }
        >
          All
        </Button>
        <Button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ showFood }
        >
          Food
        </Button>
        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ showDrinks }
        >
          Drinks
        </Button>
      </div>
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

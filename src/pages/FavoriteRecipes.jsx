import React from 'react';
import UseFavoriteRecipes from '../hook/UseFavoriteRecipes';
import { Header, FavoriteCard } from '../components';

function FavoriteRecipes() {
  const { filteredFav, allFilter, mealFilter, drinkFilter } = UseFavoriteRecipes();

  return (
    <main>
      <Header title="Receitas Favoritas" />
      <div>
        <button type="button" data-testid="filter-by-all-btn" onClick={ allFilter }>
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn" onClick={ mealFilter }>
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn" onClick={ drinkFilter }>
          Drinks
        </button>
      </div>
      {filteredFav.map((recipe, index) => (
        <FavoriteCard key={ index } recipe={ recipe } cardIndex={ index } />))}
    </main>
  );
}

export default FavoriteRecipes;

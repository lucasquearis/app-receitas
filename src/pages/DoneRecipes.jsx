import React from 'react';
import { Header, DoneRecipeCard } from '../components';
import UseDoneRecipes from '../hook/UseDoneRecipes';

function DoneRecipes() {
  const { filteredRecipes, resetFilter, foodFilter, drinksFilter } = UseDoneRecipes();

  return (
    <main>
      <Header title="Receitas Feitas" />
      <div>
        <button type="button" data-testid="filter-by-all-btn" onClick={ resetFilter }>
          All
        </button>
        <button type="button" data-testid="filter-by-food-btn" onClick={ foodFilter }>
          Food
        </button>
        <button type="button" data-testid="filter-by-drink-btn" onClick={ drinksFilter }>
          Drinks
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } cardIndex={ index } />))}
    </main>
  );
}

export default DoneRecipes;

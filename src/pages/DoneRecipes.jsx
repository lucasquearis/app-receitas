import React from 'react';
import { useSelector } from 'react-redux';
import { Header, DoneRecipeCard } from '../components';

function DoneRecipes() {
  const doneRecipes = useSelector((state) => state.doneRecipes);

  return (
    <main>
      <Header title="Receitas Feitas" />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {doneRecipes.map((recipe, index) => (
        <DoneRecipeCard key={ index } recipe={ recipe } cardIndex={ index } />))}
    </main>
  );
}

export default DoneRecipes;

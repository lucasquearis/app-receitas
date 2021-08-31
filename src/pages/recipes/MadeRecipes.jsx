import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import MadeRecipesCard from './MadeRecipesCard';

export default function MadeRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  function getMadeRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes || []);
    setFilteredRecipes(recipes || []);
    setIsMounted(true);
  }

  function getMadeRecipesFoods() {
    const madeRecipesFoods = doneRecipes.filter(({ type }) => type === 'comida');
    setFilteredRecipes(madeRecipesFoods);
  }

  function getFavoriteRecipesDrinks() {
    const madeRecipesDrinks = doneRecipes.filter(({ type }) => type === 'bebida');
    setFilteredRecipes(madeRecipesDrinks);
  }

  useEffect(() => {
    if (!isMounted) getMadeRecipes();
  });
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getMadeRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ getMadeRecipesFoods }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ getFavoriteRecipesDrinks }
      >
        Drink
      </button>
      {filteredRecipes.map((recipe, index) => (
        <MadeRecipesCard
          key={ index }
          index={ index }
          recipe={ recipe }
          isFood={ recipe.type === 'comida' }
          tags={ recipe.tags }
          doneDate={ recipe.doneDate }
        />
      ))}
    </div>
  );
}

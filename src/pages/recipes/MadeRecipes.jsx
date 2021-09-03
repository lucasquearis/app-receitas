import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import MadeRecipesCard from './MadeRecipesCard';

export default function MadeRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  function getMadeRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes || []);
    setFilteredRecipes(recipes || []);
    setIsMounted(true);
    setFilter('');
  }

  function getMadeRecipesFoods() {
    const madeRecipesFoods = doneRecipes.filter(({ type }) => type === 'comida');
    setFilteredRecipes(madeRecipesFoods);
    setFilter('comida');
  }

  function getFavoriteRecipesDrinks() {
    const madeRecipesDrinks = doneRecipes.filter(({ type }) => type === 'bebida');
    setFilteredRecipes(madeRecipesDrinks);
    setFilter('bebida');
  }

  useEffect(() => {
    if (!isMounted) getMadeRecipes();
  });
  return (
    <div>
      <Header title="Receitas Feitas" />
      <button
        className="filter-favorite-btn"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getMadeRecipes }
        style={ { backgroundColor: `${filter === '' ? '#350' : '#673'}` } }
      >
        All
      </button>
      <button
        className="filter-favorite-btn"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ getMadeRecipesFoods }
        style={ { backgroundColor: `${filter === 'comida' ? '#350' : '#673'}` } }
      >
        Food
      </button>
      <button
        className="filter-favorite-btn"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ getFavoriteRecipesDrinks }
        style={ { backgroundColor: `${filter === 'bebida' ? '#350' : '#673'}` } }
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

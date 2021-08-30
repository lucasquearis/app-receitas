import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Header from '../../components/Header';
import RecipesDoneCard from './RecipesDoneCard';

function RecipesDone() {
  const [filter, setFilter] = useState('');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const drinksFilted = doneRecipes.filter((recipe) => recipe.type.includes('bebida'));
  const foodsFilted = doneRecipes.filter((recipe) => recipe.type.includes('comida'));

  const headerProps = {
    title: 'Receitas Feitas',
    renderSearchBar: false,
  };

  const filterByBtn = () => {
    if (filter === 'comida') {
      return foodsFilted
        .map((recipe, index) => (
          <RecipesDoneCard recipe={ recipe } key={ index } index={ index } />));
    } if (filter === 'bebida') {
      return drinksFilted
        .map((recipe, index) => (
          <RecipesDoneCard recipe={ recipe } key={ index } index={ index } />));
    }
    return doneRecipes
      .map((recipe, index) => (
        <RecipesDoneCard recipe={ recipe } key={ index } index={ index } />));
  };

  return (
    <div>
      <Header { ...headerProps } />
      <Button
        color="secondary"
        variant="contained"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </Button>
      <Button
        color="secondary"
        variant="contained"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </Button>
      <Button
        color="secondary"
        variant="contained"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </Button>
      { filterByBtn() }
      {/* { doneRecipes
        .map((recipe, index) => RecipesDoneCard(recipe, index))} */}
    </div>
  );
}

export default RecipesDone;

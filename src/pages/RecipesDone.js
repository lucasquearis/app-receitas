import React from 'react';
import Header from '../components/Header';
import CardList from '../components/RecipesDone/CardList';
import Filters from '../components/RecipesDone/Filters';
import useFilter from '../hooks/useFilter';
import './RecipesDone.css';

function RecipesDone() {
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const { filteredArray, setFilter } = useFilter(getDoneRecipes);

  return (
    <div className="rd-container">
      <Header title="Receitas Feitas" />
      <Filters setFilter={ setFilter } />
      <CardList filteredArray={ filteredArray } />
    </div>
  );
}

export default RecipesDone;

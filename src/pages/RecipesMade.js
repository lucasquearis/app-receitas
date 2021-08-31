import React from 'react';
import Header from '../components/Header';

function RecipesMade() {
  return (
    <div>
      <Header title="Receitas Feitas" showRender={ false } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <div>
        <img src="/" alt="card-recipe" data-testid="0-horizontal-image" />
        <h3 data-testid="0-horizontal-top-text">Texto</h3>
        <h2 data-testid="0-horizontal-name">Nome da Receita</h2>
        <p data-testid="0-horizontal-done-date">Data</p>
        <button type="button" data-testid="0-horizontal-share-btn">Share</button>
        <p data-testid="0-Pasta-horizontal-tag">Tag</p>
      </div>
    </div>
  );
}

export default RecipesMade;

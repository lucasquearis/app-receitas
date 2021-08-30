import React from 'react';
import Header from '../components/Header';

export default function RecipesDone() {
  return (
    <main>
      <header>
        <Header title="Receitas Feitas" />
      </header>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <img alt="imagem da receita" data-testid={ `${0}-horizontal-image` } />
      <p data-testid={ `${0}-horizontal-top-text` }>Category</p>
      <h1 data-testid={ `${0}-horizontal-name` }>Título</h1>
      <p data-testid={ `${0}-horizontal-done-date` }>Data que a receita foi feita</p>
      <button type="button" data-testid={ `${0}-horizontal-share-btn` }>SHARE</button>
      <p data-testid={ `${0}-${1}-horizontal-tag` }>Tag</p>
    </main>
  );
}

import React from 'react';
import Header from '../Components/Header';
import './ReceitasFavoritas.css';

export default function Perfil() {
  return (
    <section>
      <Header title="Receitas Favoritas" />
      <div className="filter-section">
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </div>
    </section>
  );
}

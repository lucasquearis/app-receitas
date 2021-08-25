import React from 'react';
import './header.css';

export default function SearchBar() {
  return (
    <form className="search-form">
      <input
        placeholder="Buscar receita"
        data-testid="search-input"
        type="text"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
      <div className="search-radio-btns">
        <label htmlFor="radio-ingredients">
          Ingredientes
          <input
            data-testid="ingredient-search-radio"
            id="radio-ingredients"
            type="radio"
            value="Ingredientes"
          />
        </label>
        <label htmlFor="radio-name">
          Nome
          <input
            data-testid="name-search-radio"
            id="radio-name"
            type="radio"
            value="Nome"
          />
        </label>
        <label htmlFor="radio-first-letter">
          Primeira letra
          <input
            data-testid="first-letter-search-radio"
            id="radio-first-letter"
            type="radio"
            value="Primeira letra"
          />
        </label>
      </div>
    </form>
  );
}

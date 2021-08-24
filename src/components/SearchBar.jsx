import React from 'react';

export default function SearchBar() {
  return (
    <nav>
      <label htmlFor="search-input">
        <input id="search-input" type="text" data-testid="search-input" />
      </label>
      <label htmlFor="ingredient-search-radio">
        Ingrediente
        <input
          id="ingredient-search-radio"
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          id="name-search-radio"
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira Letra
        <input
          id="first-letter-search-radio"
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </nav>
  );
}

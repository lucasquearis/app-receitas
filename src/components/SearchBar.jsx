import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="text" />
      <label htmlFor="ingredient-radio">
        Ingrediente
        <input id="ingredient-radio" data-testid="ingredient-search-radio" type="radio" />
      </label>
      <label htmlFor="name-radio">
        Nome
        <input id="name-radio" data-testid="name-search-radio" type="radio" />
      </label>
      <label htmlFor="letter-radio">
        Primeira letra
        <input id="letter-radio" data-testid="first-letter-search-radio" type="radio" />
      </label>
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

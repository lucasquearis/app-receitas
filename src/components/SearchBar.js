import React from 'react';

const SearchBar = () => (
  <div data-testid="search-top-btn">
    <input
      type="text"
      data-testid="search-input"
      placeholder="Busque por uma receita"
    />
    <label htmlFor="ingredients">
      Ingredientes
      <input
        type="radio"
        id="ingredients"
        name="search-type"
        value="Ingredientes"
        data-testid="ingredient-search-radio"
      />
    </label>
    <label htmlFor="name">
      Nome
      <input
        type="radio"
        id="name"
        name="search-type"
        value="Nome"
        data-testid="name-search-radio"
      />
    </label>
    <label htmlFor="first-letter">
      Primeira letra
      <input
        type="radio"
        id="first-letter"
        name="search-type"
        value="Primeira letra"
        data-testid="first-letter-search-radio"
      />
    </label>
    <button
      type="button"
      data-testid="exec-search-btn"
    >
      Buscar
    </button>
  </div>
);

export default SearchBar;

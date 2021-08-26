import React from 'react';

export default function SearchBar() {
  return (
    <>
      teste
      <input
        id="search-input"
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient-search-radio">
        <input
          id="ingredient-search-radio"
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        <input
          id="name-search-radio"
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          id="first-letter-search-radio"
          type="radio"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </>
  );
}

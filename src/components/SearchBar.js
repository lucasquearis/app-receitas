import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="text" className="form-control" data-testid="search-input" />
      <div className="form-check">
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Name
          <input type="radio" data-testid="name-search-radio" />
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label" htmlFor="ingredientes">
          Ingredientes
          <input type="radio" data-testid="ingredient-search-radio" checked />
        </label>
        <label className="form-check-label" htmlFor="ingredientes">
          Primeira Letra
          <input type="radio" data-testid="first-letter-search-radio" checked />
        </label>
        <button type="button" data-testid="exec-search-btn">
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

import React from 'react';
import Button from '@material-ui/core/Button';

function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="text" />
      <div className="search-content-options">
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search"
            name="radio-filter"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search"
            name="radio-filter"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search"
            name="radio-filter"
          />
          Primeira letra
        </label>
      </div>
      <Button
        type="button"
        variant="contained"
        color="primary"
        data-testid="exec-search-btn"
      >
        Buscar
      </Button>
    </div>
  );
}

export default SearchBar;

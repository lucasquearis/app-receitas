import React from 'react';
import './style.css';

import Button from '@material-ui/core/Button';
import InputRadio from '../InputRadio';

function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <InputRadio
        value="ingredient"
        label="Ingrediente"
        data-testid="ingredient-search-radio"
      />
      <InputRadio
        value="name"
        label="Nome"
        data-testid="name-search-radio"
      />
      <InputRadio
        value="first-letter"
        label="Primeira letra"
        data-testid="first-letter-search-radio"
      />
      <Button
        id="search-button"
        variant="contained"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </Button>
    </div>
  );
}

export default SearchBar;

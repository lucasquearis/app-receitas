import React from 'react';
import './style.css';

import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputRadio from '../InputRadio';

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input type="text" data-testid="search-input" />
      <RadioGroup row name="seatch-bar-input-radio" aria-label="gender">
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
      </RadioGroup>
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

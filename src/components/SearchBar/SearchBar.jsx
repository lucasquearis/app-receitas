import React from 'react';
import UseSearchBar from '../../hook/UseSearchBar';

function SearchBar() {
  const { searchObj: { searchText }, handleChange, handleClick } = UseSearchBar();
  
  return (
    <form>
      <input
        type="text"
        name="searchText"
        data-testid="search-input"
        placeholder="Buscar Receita"
        value={ searchText }
        onChange={ handleChange }
      />
      <div onChange={ handleChange }>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="searchRadio"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="searchRadio"
            value="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            type="radio"
            name="searchRadio"
            value="firstLetter"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;

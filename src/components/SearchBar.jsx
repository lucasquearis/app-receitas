import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { handleChange,
    handleRadio,
    filterByPage,
  } = useContext(MyContext);

  return (
    <div>
      <input
        name="searchValue"
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <div>
        <label htmlFor="filter">
          <input
            name="filter"
            value="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
          Ingrediente
        </label>
        <label htmlFor="filter">
          <input
            name="filter"
            value="nameSearch"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
          Nome
        </label>
        <label htmlFor="filter">
          <input
            name="filter"
            value="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
          Primeira letra
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ filterByPage }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

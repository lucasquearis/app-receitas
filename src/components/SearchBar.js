import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { setFilter, setSearch, setSearchBar } = useContext(RecipesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const onClick = () => {
    setFilter(searchTerm);
    setSearchBar(true);
    setSearchTerm('');
  };
  return (
    <div>
      <input
        type="text"
        className="form-control"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setSearchTerm(value) }
      />
      <div className="form-check">
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Name
          <input
            type="radio"
            name="radioinput"
            data-testid="name-search-radio"
            value="nome"
            onChange={ ({ target: { value } }) => setSearch(value) }
          />
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label" htmlFor="ingredientes">
          Ingredientes
          <input
            type="radio"
            name="radioinput"
            data-testid="ingredient-search-radio"
            value="ingrediente"
            onChange={ ({ target: { value } }) => setSearch(value) }
          />
        </label>
        <label className="form-check-label" htmlFor="ingredientes">
          Primeira Letra
          <input
            type="radio"
            name="radioinput"
            data-testid="first-letter-search-radio"
            value="primeira letra"
            onChange={ ({ target: { value } }) => setSearch(value) }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => onClick() }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

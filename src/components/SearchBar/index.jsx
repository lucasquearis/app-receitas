import React, { useState } from 'react';
import './style.css';

function SearchBar() {
  const [searchInputs, setSearchInputs] = useState(false);
  const [formInputs, setFormInput] = useState({});

  const handleClick = () => {
    if (searchInputs) {
      setSearchInputs(false);
    } else {
      setSearchInputs(true);
    }
  };

  const handleChange = ({ target: { value, type, name, checked } }) => {
    if (type === 'checkbox') {
      setFormInput({ ...formInputs, [name]: checked });
    } else {
      setFormInput({ ...formInputs, [name]: value });
    }
  };

  return (
    <>
      <button type="button" onClick={ handleClick } data-testid="search-top-btn">
        <img src="/images/searchIcon.svg" alt="search-button" />
      </button>
      {
        searchInputs && (
          <form>
            <label htmlFor="search-input">
              <input
                id="search-input"
                type="text"
                onChange={ handleChange }
                data-testid="search-input"
                placeholder="Digite sua busca"
                name="searchInput"
              />
            </label>

            <label htmlFor="ingredient-search-radio">
              Ingrediente
              <input
                id="ingredient-search-radio"
                type="radio"
                onChange={ handleChange }
                data-testid="ingredient-search-radio"
                name="selectedSearch"
                value="ingredient"
              />
            </label>

            <label htmlFor="name-search-radio">
              Nome
              <input
                id="name-search-radio"
                type="radio"
                onChange={ handleChange }
                data-testid="name-search-radio"
                name="selectedSearch"
                value="name"
              />
            </label>

            <label htmlFor="first-letter-search-radio">
              Primeira Letra
              <input
                id="first-letter-search-radio"
                type="radio"
                onChange={ handleChange }
                data-testid="first-letter-search-radio"
                name="selectedSearch"
                value="firstLetter"
              />
            </label>

            <button type="button" data-testid="exec-search-btn">Buscar</button>
          </form>
        )
      }
    </>
  );
}

export default SearchBar;

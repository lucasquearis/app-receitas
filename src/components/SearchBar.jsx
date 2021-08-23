import React, { useState } from 'react';

export default function SearchBar() {
  const INITIAL_STATE = {
    value: '',
    searchType: '',
  };

  const [search, setSearch] = useState(INITIAL_STATE);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert('do something');
  };

  const { value } = search;

  return (
    <section className="search-bar">
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          value={ value }
          onChange={ handleChange }
          name="value"
          placeholder="Buscar Receitas"
          data-testid="search-input"
        />
        <label htmlFor="ingredient-search-radio">
          Ingrediente
          <input
            type="radio"
            value="ingredient"
            name="searchType"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="name-search-radio">
          Nome
          <input
            type="radio"
            value="name"
            name="searchType"
            data-testid="name-search-radio"
            id="name-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          Primeira Letra
          <input
            type="radio"
            value="firstLetter"
            name="searchType"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            onChange={ handleChange }
          />
        </label>
        <button type="submit" data-testid="exec-search-btn">
          Buscar
        </button>
      </form>
    </section>
  );
}

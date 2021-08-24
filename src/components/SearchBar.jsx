import React, { useState } from 'react';

function SearchBar() {
  const [search, setSearch] = useState({ result: '', type: '' });

  const handleChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { result } = search;
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          value={ result }
          name="result"
          onChange={ handleChange }
          type="text"
          data-testid="search-input"
          className="toggle-input"
        />
        <label htmlFor="ingredient-radio">
          Ingrediente
          <input
            type="radio"
            value="ingredient"
            name="type"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="dish-name">
          Nome do prato
          <input
            type="radio"
            value="name"
            name="type"
            onChange={ handleChange }
            id="name-search-radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            type="radio"
            value="letter"
            name="type"
            onChange={ handleChange }
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button data-testid="exec-search-btn" type="submit">Pesquisar</button>
      </form>
    </div>
  );
}

export default SearchBar;

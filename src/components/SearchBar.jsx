import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar(
  {
    inputValue,
    handleChange,
    setIngredientValue,
    setNameValue,
    setLetterValue,
  },
) {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ inputValue }
        onChange={ (e) => handleChange(e) }
      />
      <label htmlFor="ingredient-radio">
        Ingrediente
        <input
          setIngredientValue
          id="ingredient-radio"
          data-testid="ingredient-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="name-radio">
        Nome
        <input
          id="name-radio"
          data-testid="name-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="letter-radio">
        Primeira letra
        <input
          id="letter-radio"
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  inputValue: PropTypes.string.isRequired,
};

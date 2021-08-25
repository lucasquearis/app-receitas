import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar(
  {
    inputValue,
    handleChange,
    setIngredientValue,
    setNameValue,
    setLetterValue,
    handleClick,
  },
) {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ inputValue }
        onChange={ (e) => handleChange(e.target.value) }
      />
      <label htmlFor="ingredient-radio">
        Ingrediente
        <input
          onChange={ () => setIngredientValue(true) }
          id="ingredient-radio"
          data-testid="ingredient-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="name-radio">
        Nome
        <input
          onChange={ () => setNameValue(true) }
          id="name-radio"
          data-testid="name-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="letter-radio">
        Primeira letra
        <input
          onChange={ () => setLetterValue(true) }
          id="letter-radio"
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <button onClick={ handleClick } type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  setIngredientValue: PropTypes.func.isRequired,
  setNameValue: PropTypes.func.isRequired,
  setLetterValue: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

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
    <div
      className="d-flex flex-column navbar fixed-top search justify-content-around"
      style={ { height: '134px' } }
    >
      <div className="w-100">
        <input
          className="w-100"
          data-testid="search-input"
          type="text"
          value={ inputValue }
          onChange={ (e) => handleChange(e.target.value) }
        />
      </div>
      <div className="w-100 d-flex justify-content-around">
        <label htmlFor="ingredient-radio" className="m-0">
          <input
            className="mr-1"
            name="search"
            onChange={ () => setIngredientValue(true) }
            id="ingredient-radio"
            data-testid="ingredient-search-radio"
            type="radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name-radio" className="m-0">
          <input
            className="mr-1"
            name="search"
            onChange={ () => setNameValue(true) }
            id="name-radio"
            data-testid="name-search-radio"
            type="radio"
          />
          Nome
        </label>
        <label htmlFor="letter-radio" className="m-0">
          <input
            className="mr-1"
            name="search"
            onChange={ () => setLetterValue(true) }
            id="letter-radio"
            data-testid="first-letter-search-radio"
            type="radio"
          />
          Primeira letra
        </label>
      </div>
      <div className="w-100 d-flex">
        <Button
          className="p-1 w-100 border bg-color"
          onClick={ handleClick }
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </Button>
      </div>
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

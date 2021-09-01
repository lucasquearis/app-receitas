import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function Search({ ingredient }) {
  const [radio, setRadio] = useState('s');
  const [searchValue, setSearchValue] = useState('');

  const { API } = useContext(RecipesContext);
  const { searchByFilters, pathname } = API;

  function handleChange({ target }) {
    setSearchValue(target.value);
  }

  function change(value) {
    setRadio(value[0]);
  }

  function click() {
    console.log(radio, searchValue);
    switch (radio) {
    case 'i':
      if (searchValue.length > 0) {
        searchByFilters(radio, searchValue);
      } else {
        alert('Escreva um ingrediente!');
      }
      break;

    case 'f':
      if (searchValue.length === 1) {
        searchByFilters(radio, searchValue);
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;

    default:
      searchByFilters(radio, searchValue);
      break;
    }
  }

  function searchIngredient() {
    setSearchValue(ingredient);
    document.getElementById('labelIngredient').click();
    document.getElementById('exec').click();
  }

  useEffect(() => {
    if (ingredient && radio === 's') {
      const delay = 500;
      setTimeout(searchIngredient, delay);
    }
  });

  return (
    <div className="search-open">
      <div className="search-input">
      <input
        type="search"
        placeholder="Pesquisa"
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
        value={ searchValue }
      />
      <div className="search-radio" onChange={ ({ target: { value } }) => change(value) }>
        <label htmlFor="labelName">
          <input
            className="radio-btn"
            type="radio"
            name="radio"
            value="search"
            id="labelName"
            data-testid="name-search-radio"
          />
          <span>Nome</span>
        </label>
        <label htmlFor="labelIngredient">
          <input
            className="radio-btn"
            type="radio"
            name="radio"
            value="ingredient"
            id="labelIngredient"
            data-testid="ingredient-search-radio"
          />
          <span>Ingrediente</span>
        </label>
        <label htmlFor="labelFirst">
          <input
            className="radio-btn"
            type="radio"
            name="radio"
            value="first"
            id="labelFirst"
            data-testid="first-letter-search-radio"
          />
          <span>Primeira letra</span>
        </label>
      </div>
      <button
        class="btn btn-success"
        type="button"
        id="exec"
        data-testid="exec-search-btn"
        onClick={ click }
      >
        Pesquisar
      </button>
      </div>
    </div>
  );
}

Search.propTypes = {
  ingredient: PropTypes.string.isRequired,
};

export default Search;

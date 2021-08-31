import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function Search() {
  const [radio, setRadio] = useState('s');
  const [searchValue, setSearchValue] = useState('');

  const { API } = useContext(RecipesContext);
  const { searchByFilters } = API;

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

  return (
    <div>
      <input
        type="search"
        placeholder="Pesquisa"
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
      />
      <div onChange={ ({ target: { value } }) => change(value) }>
        <label htmlFor="labelName">
          <input
            type="radio"
            name="radio"
            value="search"
            data-testid="name-search-radio"
          />
          <span>Nome</span>
        </label>

        <label htmlFor="labelIngredient">
          <input
            type="radio"
            name="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          <span>Ingrediente</span>
        </label>

        <label htmlFor="labelFirst">
          <input
            type="radio"
            name="radio"
            value="first"
            data-testid="first-letter-search-radio"
          />
          <span>Primeira letra</span>
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn" onClick={ click }>
        Pesquisar
      </button>
    </div>
  );
}

export default Search;

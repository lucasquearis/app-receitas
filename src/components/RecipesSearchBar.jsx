import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as fetchAPI from '../service/fetchAPI';
import RecipesCard from './RecipesCard';

function RecipesSearchBar() {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const handleChange = ({ target }) => {
    const { id, value, name } = target;
    if (name === 'newSearch') {
      setSearch(value);
    } else {
      setType(id);
    }
  };

  const warning = () => {
    if (type === 'firstLetter' && search.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleClick = async () => {
    warning();
    const recipes = await fetchAPI.filteredRecipes(type, search);
    setData(recipes === null ? [] : recipes);
    if (recipes === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  if (data.length === 1) return <Redirect to={ `/comidas/${data[0].idMeal}` } />;

  return (
    <>
      <input
        name="newSearch"
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
      />
      <label htmlFor="filter">
        <input
          id="ingredient"
          name="filter"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
        Ingrediente
        <input
          id="name"
          name="filter"
          type="radio"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Nome
        <input
          id="firstLetter"
          name="filter"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
        Primeira Letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
      <RecipesCard data={ data } />
    </>
  );
}

export default RecipesSearchBar;

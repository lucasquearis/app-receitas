import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as fetchAPI from '../service/fetchAPI';
import DrinksCard from './DrinksCard';

function DrinksSearchBar() {
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
    const drinks = await fetchAPI.filteredDrinks(type, search);
    setData(drinks === null ? [] : drinks);
    if (drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  if (data.length === 1) return <Redirect to={ `/bebidas/${data[0].idDrink}` } />;
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
      <DrinksCard data={ data } />
    </>
  );
}

export default DrinksSearchBar;

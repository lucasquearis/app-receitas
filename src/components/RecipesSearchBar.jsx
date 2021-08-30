import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext';
import * as fetchAPI from '../service/fetchAPI';

function RecipesSearchBar() {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const newFoodRecipes = useContext(MyContext);

  const handleChange = ({ target }) => {
    const { id, value: word, name } = target;
    if (name === 'newSearch') {
      setSearch(word);
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
    newFoodRecipes(recipes === null ? [] : recipes);
    console.log('renderizou');
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
    </>
  );
}

export default RecipesSearchBar;
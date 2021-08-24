import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import { fetchMeals, fetchDrinks } from '../services/fechRecipes';

export default function SearchBar() {
  const INITIAL_STATE = {
    value: '',
    searchType: '',
  };

  const [search, setSearch] = useState(INITIAL_STATE);
  const { value, searchType } = search;
  const { setDrinks, setMeals } = useContext(Context);
  const { location } = useHistory();

  const recipeType = location.pathname === '/comidas' ? 'meal' : 'cocktail';
  const fetchType = location.pathname === '/comidas' ? fetchMeals : fetchDrinks;
  const setRecipeType = location.pathname === '/comidas' ? setMeals : setDrinks;

  const handleChange = ({ target }) => {
    const { name, value: v } = target;
    setSearch({ ...search, [name]: v });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchType === 'ingredient') {
      fetchType(setRecipeType, `https://www.the${recipeType}db.com/api/json/v1/1/filter.php?i=${value}`);
    }
    if (searchType === 'firstLetter') {
      if (value.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        return;
      }
      fetchType(setRecipeType, `https://www.the${recipeType}db.com/api/json/v1/1/search.php?f=${value}`);
    }
    if (searchType === 'name') {
      fetchType(setRecipeType, `https://www.the${recipeType}db.com/api/json/v1/1/search.php?s=${value}`);
    }
  };

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

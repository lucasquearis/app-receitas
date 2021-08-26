import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import {
  fetchMealsByIngredient,
  fetchMealsByName,
  fetchMealsByFirstLetter,
} from '../services/requestMealsAPI';
import {
  fetchCocktailsByIngredient,
  fetchCocktailsByName,
  fetchCocktailsByFirstLetter,
} from '../services/requestCocktailsAPI';

export default function SearchBar() {
  const { setCocktails, setMeals, recipeType } = useContext(Context);
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const maxRecipes = 12;
  const firstLetterSearch = 'first-letter-search';

  const getMeals = async () => {
    let response = '';
    if (searchRadio === firstLetterSearch && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (searchRadio === 'ingredient-search') {
      response = await fetchMealsByIngredient(searchInput);
    }
    if (searchRadio === 'name-search') {
      response = await fetchMealsByName(searchInput);
    }
    if (searchRadio === firstLetterSearch) {
      response = await fetchMealsByFirstLetter(searchInput);
    }
    if (response !== null && searchRadio !== '') {
      return setMeals(response.slice(0, maxRecipes));
    }

    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const getDrinks = async () => {
    let response = '';
    if (searchRadio === firstLetterSearch && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (searchRadio === 'ingredient-search-radio') {
      response = await fetchCocktailsByIngredient(searchInput);
    }
    if (searchRadio === 'name-search-radio') {
      response = await fetchCocktailsByName(searchInput);
    }
    if (searchRadio === firstLetterSearch) {
      response = await fetchCocktailsByFirstLetter(searchInput);
    }
    if (response !== null && searchRadio !== '') {
      console.log(response);
      return setCocktails(response.slice(0, maxRecipes));
    }

    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleInputText = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleChange = ({ target: { id } }) => {
    setSearchRadio(id);
  };

  const handleClick = () => {
    if (recipeType === 'meals') {
      getMeals();
    } else {
      getDrinks();
    }
  };

  return (
    <>
      <input
        id="search-input"
        type="text"
        data-testid="search-input"
        className="input-field-search"
        name="search-input"
        placeholder="receita"
        value={ searchInput }
        onChange={ handleInputText }
      />
      <label htmlFor="ingredient-search-radio">
        ingredientes
        <input
          id="ingredient-search"
          type="radio"
          data-testid="ingredient-search-radio"
          name="radio-filter"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name-search-radio">
        Nome
        <input
          id="name-search"
          type="radio"
          data-testid="name-search-radio"
          name="radio-filter"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        Primeira Letra
        <input
          id="first-letter-search"
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        className="button-search"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </>
  );
}

import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import * as RequestMealsAPI from '../services/requestMealsAPI';
import * as RequestCocktailsAPI from '../services/requestDrinksAPI';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { setCocktails, setMeals, recipeType } = useContext(Context);
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const maxRecipes = 12;
  const firstLetterSearch = 'first-letter-search';

  const getMeals = async () => {
    let response = '';
    if (searchRadio === firstLetterSearch && searchInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (searchRadio === 'ingredient-search') {
      response = await RequestMealsAPI.fetchMealsByIngredient(searchInput);
    }
    if (searchRadio === 'name-search') {
      response = await RequestMealsAPI.fetchMealsByName(searchInput);
    }
    if (searchRadio === firstLetterSearch) {
      response = await RequestMealsAPI.fetchMealsByFirstLetter(searchInput);
    }
    if (response !== null && searchRadio !== '') {
      return setMeals(response.slice(0, maxRecipes));
    }

    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const getDrinks = async () => {
    let response = '';
    if (searchRadio === firstLetterSearch && searchInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (searchRadio === 'ingredient-search') {
      response = await RequestCocktailsAPI.fetchDrinksByIngredient(searchInput);
    }
    if (searchRadio === 'name-search') {
      response = await RequestCocktailsAPI.fetchDrinksByName(searchInput);
    }
    if (searchRadio === firstLetterSearch) {
      response = await RequestCocktailsAPI.fetchDrinksByFirstLetter(searchInput);
    }
    if (response !== null && searchRadio !== '') {
      return setCocktails(response.slice(0, maxRecipes));
    }

    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
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
    <div>
      <div className={ styles.searchBar }>
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
      </div>
      <button
        type="button"
        className="button-search"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

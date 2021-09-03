import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../styles/Header.css';
import context from '../context/Context';

export default function SearchBar({ title }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const {
    setSearchDataMeals,
    setSearchDataDrinks,
    setLoading } = useContext(context);

  const fetchRecipesMeals = async (url) => {
    setLoading(true);
    try {
      const request = await fetch(url);
      const { meals } = await request.json();
      setSearchDataMeals(meals);
    } catch (error) {
      return console.log(error);
    }
    setLoading(false);
  };

  const fetchRecipesDrinks = async (url) => {
    setLoading(true);
    try {
      const request = await fetch(url);
      const { drinks } = await request.json();
      setSearchDataDrinks(drinks);
    } catch (error) {
      return console.log(error);
    }
    setLoading(false);
  };

  const msgCharacter = 'Sua busca deve conter somente 1 (um) caracter';
  const msgFilter = 'Preencha o campo de busca e selecione o filtro';
  const showAlert = (func, mensagem) => func(mensagem);

  const handleSearchMeals = () => {
    if (searchInput && searchRadio) {
      if (searchRadio === 'ingrediente') {
        fetchRecipesMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      } else if (searchRadio === 'nome') {
        fetchRecipesMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
      } else if (searchRadio === 'primeira-letra' && searchInput.length === 1) {
        fetchRecipesMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`);
      } else {
        return showAlert(alert, msgCharacter);
      }
    } else {
      return showAlert(alert, msgFilter);
    }
  };

  const handleSearchDrinks = () => {
    if (searchInput && searchRadio) {
      if (searchRadio === 'ingrediente') {
        fetchRecipesDrinks(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`);
      } else if (searchRadio === 'nome') {
        fetchRecipesDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
      } else if (searchRadio === 'primeira-letra' && searchInput.length === 1) {
        fetchRecipesDrinks(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`);
      } else {
        return showAlert(alert, msgCharacter);
      }
    } else {
      return showAlert(alert, msgFilter);
    }
  };

  const handleSearch = () => {
    const search = title === 'Comidas' ? handleSearchMeals() : handleSearchDrinks();
    return search;
  };

  return (
    <form className="search-form">
      <input
        placeholder="Buscar receita"
        data-testid="search-input"
        type="text"
        onChange={ ({ target: { value } }) => setSearchInput(value) }
      />
      <div className="search-radio-btns">
        <input
          name="radio-btns-search"
          data-testid="ingredient-search-radio"
          id="radio-ingredients"
          type="radio"
          value="ingrediente"
          onChange={ ({ target: { value } }) => setSearchRadio(value) }
        />
        <label htmlFor="radio-ingredients">
          Ingredientes
        </label>
        <input
          name="radio-btns-search"
          data-testid="name-search-radio"
          id="radio-name"
          type="radio"
          value="nome"
          onChange={ ({ target: { value } }) => setSearchRadio(value) }
        />
        <label htmlFor="radio-name">
          Nome
        </label>
        <input
          name="radio-btns-search"
          data-testid="first-letter-search-radio"
          id="radio-first-letter"
          type="radio"
          value="primeira-letra"
          onChange={ ({ target: { value } }) => setSearchRadio(value) }
        />
        <label htmlFor="radio-first-letter">
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string,
}.isRequired;

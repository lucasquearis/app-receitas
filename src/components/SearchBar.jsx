import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../styles/Header.css';
import context from '../context/Context';

export default function SearchBar({ title }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchRadio, setSearchRadio] = useState('');
  const {
    searchDataMeals,
    searchDataDrinks,
    setSearchDataMeals,
    setSearchDataDrinks } = useContext(context);

  // const UM = 1;
  // if (searchDataMeals.length === UM) {
  //   return <Redirect to={ `/comidas/${searchDataMeals[0].idMeal}` } />;
  // }

  // if (searchDataDrinks.length === UM) {
  //   return <Redirect to={ `/bebidas/${searchDataDrinks[0].idDrink}` } />;
  // }

  const fetchRecipesMeals = async (url) => {
    try {
      const request = await fetch(url);
      const { meals } = await request.json();
      setSearchDataMeals(meals);
    } catch (error) {
      return console.log(error);
    }
  };

  const fetchRecipesDrinks = async (url) => {
    try {
      const request = await fetch(url);
      const { drinks } = await request.json();
      setSearchDataDrinks(drinks);
    } catch (error) {
      return console.log(error);
    }
  };

  const msgCharacter = 'Sua busca deve conter somente 1 (um) caracter';
  const msgFilter = 'Preencha o campo de busca e selecione o filtro';
  const msgNotRecipe = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
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
    if (searchDataMeals === null) return showAlert(alert, msgNotRecipe);
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
    if (searchDataDrinks === null) return showAlert(alert, msgNotRecipe);
  };

  const handleSearch = () => {
    const search = title === 'Comidas' ? handleSearchMeals() : handleSearchDrinks();
    return search;
  };

  // if (searchDataMeals.length === 0 || searchDataDrinks.length === 0) {
  //   return <p>loading...</p>;
  // }

  return (
    <form className="search-form">
      <input
        placeholder="Buscar receita"
        data-testid="search-input"
        type="text"
        onChange={ ({ target: { value } }) => setSearchInput(value) }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Buscar
      </button>
      <div className="search-radio-btns">
        <label htmlFor="radio-ingredients">
          Ingredientes
          <input
            name="radio-btns-search"
            data-testid="ingredient-search-radio"
            id="radio-ingredients"
            type="radio"
            value="ingrediente"
            onChange={ ({ target: { value } }) => setSearchRadio(value) }
          />
        </label>
        <label htmlFor="radio-name">
          Nome
          <input
            name="radio-btns-search"
            data-testid="name-search-radio"
            id="radio-name"
            type="radio"
            value="nome"
            onChange={ ({ target: { value } }) => setSearchRadio(value) }
          />
        </label>
        <label htmlFor="radio-first-letter">
          Primeira letra
          <input
            name="radio-btns-search"
            data-testid="first-letter-search-radio"
            id="radio-first-letter"
            type="radio"
            value="primeira-letra"
            onChange={ ({ target: { value } }) => setSearchRadio(value) }
          />
        </label>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string,
}.isRequired;

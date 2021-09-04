import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/index';
import nameSearchFoodsAPI
  from '../services/Header-SearchBar/Foods/searchFoodsByName';
import ingredientSearcFoodsAPI
  from '../services/Header-SearchBar/Foods/searchFoodsByIngredient';
import firstLetterSearchFoodsAPI
  from '../services/Header-SearchBar/Foods/searchFoodsByFirstLetter';
import firstLetterSearchDrinkdsAPI
  from '../services/Header-SearchBar/Drinks/searchDrinksByFirstLetter';
import ingredientSearchDrinksAPI
  from '../services/Header-SearchBar/Drinks/searchDrinksByIngredient';
import nameSearchDrinksAPI
  from '../services/Header-SearchBar/Drinks/searchDrinksByName';

function SearchBar({ title }) {
  const [searchBy, setSearchBy] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { setSearchBarResult } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const alertFirstLetterBiggerThanOne = () => {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  };

  const renderFoods = () => {
    switch (searchBy) {
    case 'ingredient':
      setSearchBarResult(ingredientSearcFoodsAPI(searchInput));
      break;
    case 'name':
      setSearchBarResult(nameSearchFoodsAPI(searchInput));
      break;
    case 'firstLetter':
      if (searchInput.length > 1) {
        alertFirstLetterBiggerThanOne();
        break;
      }
      setSearchBarResult(firstLetterSearchFoodsAPI(searchInput));
      break;
    default:
      break;
    }
  };

  const renderDrinks = () => {
    switch (searchBy) {
    case 'ingredient':
      setSearchBarResult(ingredientSearchDrinksAPI(searchInput));
      break;
    case 'name':
      setSearchBarResult(nameSearchDrinksAPI(searchInput));
      break;
    case 'firstLetter':
      if (searchInput.length > 1) {
        alertFirstLetterBiggerThanOne();
        break;
      }
      setSearchBarResult(firstLetterSearchDrinkdsAPI(searchInput));
      break;
    default:
      break;
    }
  };

  const checkPages = () => {
    if (title === 'Comidas') {
      renderFoods();
    }
    if (title === 'Bebidas') {
      renderDrinks();
    }
  };

  const handleClick = () => {
    checkPages();
  };

  return (
    <div className="header__second-div">
      <form>
        <fieldset>
          <label htmlFor="search-input">
            Filtrar por:
            <input
              name="searchInput"
              data-testid="search-input"
              onChange={ handleChange }
              value={ searchInput }
            />
          </label>
          <label htmlFor="searchByIngredient">
            Ingrediente
            <input
              id="searchByIngredient"
              name="searchBy"
              data-testid="ingredient-search-radio"
              type="radio"
              onClick={ () => setSearchBy('ingredient') }
            />
          </label>
          <label htmlFor="searchByName">
            Nome
            <input
              id="searchByName"
              name="searchBy"
              data-testid="name-search-radio"
              type="radio"
              onClick={ () => setSearchBy('name') }
            />
          </label>
          <label htmlFor="searchByFirstLetter">
            Primeira letra
            <input
              name="searchBy"
              id="searchByFirstLetter"
              data-testid="first-letter-search-radio"
              type="radio"
              onClick={ () => setSearchBy('firstLetter') }
            />
          </label>
          <button
            onClick={ handleClick }
            data-testid="exec-search-btn"
            type="button"
          >
            Search
          </button>
        </fieldset>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default SearchBar;

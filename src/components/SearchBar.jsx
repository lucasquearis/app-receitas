import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import {
  fetchFoodsByIngredient,
  fetchFoodsByName,
  fetchFoodsByFirstLetter } from '../services/foodsAPI';
import {
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFirstLetter } from '../services/drinksAPI';

function SearchBar({ pageName }) {
  const { setDrinks, setFoods } = useContext(AppContext);

  const [inputText, setInputText] = useState('');
  const [inputRadio, setInputRadio] = useState('');
  const firstLetterSearch = 'first-letter-search';
  const maxRecipes = 12;

  const getFoods = async () => {
    let response = '';
    if (inputRadio === firstLetterSearch && inputText.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (inputRadio === 'ingredient-search') {
      response = await fetchFoodsByIngredient(inputText);
    }
    if (inputRadio === 'name-search') {
      response = await fetchFoodsByName(inputText);
    }
    if (inputRadio === firstLetterSearch) {
      response = await fetchFoodsByFirstLetter(inputText);
    }
    if (response !== null && inputRadio !== '') {
      return setFoods(response.slice(0, maxRecipes));
    }
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const getDrinks = async () => {
    let response = '';
    if (inputRadio === firstLetterSearch && inputText.length > 1) {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (inputRadio === 'ingredient-search') {
      response = await fetchDrinksByIngredient(inputText);
    }
    if (inputRadio === 'name-search') {
      response = await fetchDrinksByName(inputText);
    }
    if (inputRadio === 'first-letter-search') {
      response = await fetchDrinksByFirstLetter(inputText);
    }
    if (response !== null && inputRadio !== '') {
      return setDrinks(response.slice(0, maxRecipes));
    }
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  const handleChangeInputText = (event) => {
    // console.log(inputText);
    const { value } = event.target;
    setInputText(value);
  };

  const handleChangeInputRadio = (event) => {
    // console.log(inputRadio);
    const { id } = event.target;
    setInputRadio(id);
  };

  const handleClickButton = () => {
    if (pageName === 'Comidas') {
      getFoods();
    } else {
      getDrinks();
    }
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ inputText }
        onChange={ handleChangeInputText }
      />
      <div className="search-content-options">
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-search"
            name="radio-filter"
            onClick={ handleChangeInputRadio }
          />
          Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-search"
            name="radio-filter"
            onClick={ handleChangeInputRadio }
          />
          Nome
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-search"
            name="radio-filter"
            onClick={ handleChangeInputRadio }
          />
          Primeira letra
        </label>
      </div>
      <Button
        type="button"
        variant="contained"
        color="primary"
        data-testid="exec-search-btn"
        onClick={ handleClickButton }
      >
        Buscar
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default SearchBar;

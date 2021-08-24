import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputRadio from '../InputRadio';

import { ContextHeader } from '../../Context/ContextHeader';
import fetchApi from '../../Helpers/fetchApi';

function SearchBar() {
  const [previousSearch, setPreviousSearch] = useState({});
  const { showAlert, setProducts } = useContext(ContextHeader);

  const history = useHistory();
  const { location: { pathname } } = history;
  const url = pathname === '/' ? 'https://www.themealdb.com/api/json/v1/1/' : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const handleSearch = async () => {
    const { type, input } = previousSearch;
    switch (type) {
    case 'name':
      return setProducts(await fetchApi(url, 'search.php?s=', input));
    case 'ingredient':
      return setProducts(await fetchApi(url, 'filter.php?i=', input));
    case 'first-letter':
      if (input.length > 1) {
        return showAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
      }
      return setProducts(await fetchApi(url, 'search.php?f=', input));
    default:
      break;
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setPreviousSearch({
      ...previousSearch,
      [name]: value,
    });
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        data-testid="search-input"
        name="input"
        onChange={ (event) => handleChange(event) }
      />
      <RadioGroup
        row
        name="type"
        aria-label="gender"
        onChange={ (event) => handleChange(event) }
      >
        <InputRadio
          value="ingredient"
          label="Ingrediente"
          data-testid="ingredient-search-radio"
        />
        <InputRadio
          value="name"
          label="Nome"
          data-testid="name-search-radio"
        />
        <InputRadio
          value="first-letter"
          label="Primeira letra"
          data-testid="first-letter-search-radio"
        />
      </RadioGroup>
      <Button
        variant="contained"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Pesquisar
      </Button>
    </div>
  );
}

export default SearchBar;

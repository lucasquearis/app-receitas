import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createBrowserHistory } from 'history';
import Radios from './Radios';

function Search({ functions }) {
  const name = 'name';
  const values = ['name', 'ingredient', 'first'];
  const labels = ['Nome', 'Ingrediente', 'Primeira letra'];

  const msg = alert;
  const [radio, setRadio] = useState('s');
  const [searchValue, setSearchValue] = useState('');
  const history = createBrowserHistory();

  const tests = [
    'name-search-radio',
    'ingredient-search-radio',
    'first-letter-search-radio',
  ];

  function handleChange({ target }) {
    setSearchValue(target.value);
  }

  function change({ value }) {
    switch (value) {
    case 'name':
      setRadio('s');
      break;
    case 'ingredient':
      setRadio('i');
      break;
    case 'first':
      setRadio('f');
      break;
    default:
      break;
    }
  }

  function click() {
    const { location: { pathname } } = history;
    let searcher;

    switch (pathname) {
    case '/comidas':
      searcher = functions.searchFoods;
      break;

    case '/bebidas':
      searcher = functions.searchDrinks;
      break;

    default:
      break;
    }

    console.log(radio, searchValue);
    switch (radio) {
    case 'i':
      if (searchValue.length > 0) {
        searcher(radio, searchValue);
      } else {
        msg('Escreva um ingrediente!');
      }
      break;

    case 'f':
      if (searchValue.length === 1) {
        searcher(radio, searchValue);
      } else {
        msg('Sua busca deve conter somente 1 (um) caracter');
      }
      break;

    default:
      searcher(radio, searchValue);
      break;
    }
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Pesquisa"
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
      />
      <Radios { ...{ name, change, tests, labels, values } } />
      <button type="button" data-testid="exec-search-btn" onClick={ click }>
        Pesquisar
      </button>
    </div>
  );
}

Search.propTypes = {
  functions: PropTypes.shape({
    searchDrinks: PropTypes.func,
    searchFoods: PropTypes.func,
  }).isRequired,
};

export default Search;

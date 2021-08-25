import PropTypes from 'prop-types';
import React, { useState } from 'react';

import useAPI from '../hooks/useAPI';
import Radios from './Radios';

function Search({ history }) {
  const name = 'name';
  const values = ['name', 'ingredient', 'first'];
  const labels = ['Nome', 'Ingrediente', 'Primeira letra'];

  const msg = alert;
  const [, functions] = useAPI();
  const [radio, setRadio] = useState('s');

  const tests = [
    'name-search-radio',
    'ingredient-search-radio',
    'first-letter-search-radio',
  ];

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
    const search = document.querySelector('input[type="search"]');
    const { location: { pathname } } = history;
    const { value } = search;
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

    console.log(radio, value.length);

    switch (radio) {
    case 'i':
      if (value.length > 0) {
        searcher(radio, value);
      } else {
        msg('Escreva um ingrediente!');
      }
      break;

    case 'f':
      if (value.length === 1) {
        searcher(radio, value);
      } else {
        msg('Sua busca deve conter somente 1 (um) caracter');
      }
      break;

    default:
      searcher(radio, value);
      break;
    }
  }

  return (
    <div>
      <input type="search" data-testid="search-input" placeholder="Pesquisa" />
      <Radios { ...{ name, change, tests, labels, values } } />
      <button type="button" data-testid="exec-search-btn" onClick={ click }>
        Pesquisar
      </button>
    </div>
  );
}

Search.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Search;

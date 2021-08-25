import React, { useState } from 'react';
import Radios from './Radios';

function Search() {
  const name = 'name';
  const values = ['name', 'ingredient', 'first'];
  const labels = ['Nome', 'Ingrediente', 'Primeira letra'];

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
    console.log(radio, search.value);
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

export default Search;

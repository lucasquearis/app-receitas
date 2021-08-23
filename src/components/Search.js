import React from 'react';
import Radios from './Radios';

function Search() {
  const name = 'name';
  const values = ['name', 'ingredient', 'first'];

  const tests = [
    'name-search-radio',
    'ingredient-search-radio',
    'first-letter-search-radio',
  ];

  function change(target) {
    console.log(target);
  }

  return (
    <div>
      <input type="search" data-testid="search-input" placeholder="Pesquisa" />
      <Radios { ...{ name, change, tests, values } } />
      <button type="button" data-testid="exec-search-btn">
        Pesquisar
      </button>
    </div>
  );
}

export default Search;

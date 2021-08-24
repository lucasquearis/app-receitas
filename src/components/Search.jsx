import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <div>
        <label htmlFor="search-input">
          Search:
          <input type="text" data-testid="search-input" />
        </label>
        <label htmlFor="search-input">
          Ingrediente
          <input type="radio" data-testid="ingredient-search-radio" />
        </label>
        <label htmlFor="search-input">
        Nome
          <input type="radio" data-testid="name-search-radio" />
        </label>
        <label htmlFor="search-input">
        Primeira letra 
          <input type="radio" data-testid="first-letter-search-radio" />
        </label>
        <button data-testid="exec-search-btn">Search</button>
      </div>
    );
  }
}

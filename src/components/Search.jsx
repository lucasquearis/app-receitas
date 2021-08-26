import React, { Component } from 'react';
import fetch from '../services/fetch';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: '',
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDrinks = this.handleDrinks.bind(this);
    this.handleFoods = this.handleFoods.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleDrinks() {
    const { radio, text } = this.state;
    if (radio === 'Ingrediente') {
      const ingredientes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`);
      return ingredientes;
    } if (radio === 'Nome') {
      const nomes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`);
      return nomes;
    } if (radio === 'Primeira letra' && text.length === 1) {
      const primeiras = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`);
      return primeiras;
    } alert('Sua busca deve conter somente 1 (um) caracter');
  }

  async handleFoods() {
    const { radio, text } = this.state;
    if (radio === 'Ingrediente') {
      const ingredientes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
      return ingredientes;
    } if (radio === 'Nome') {
      const nomes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
      return nomes;
    } if (radio === 'Primeira letra' && text.length === 1) {
      const primeiras = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`);
      return primeiras;
    } alert('Sua busca deve conter somente 1 (um) caracter');
  }

  handleClick() {
    const path = window.location.pathname;
    if (path === '/comidas') {
      this.handleFoods();
    }
    if (path === '/bebidas') {
      this.handleDrinks();
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="search-input">
          Search:
          <input
            type="text"
            name="text"
            data-testid="search-input"
            onChange={ this.handleChange }
          />
        </label>
        <div name="radio" onChange={ this.handleChange }>
          <label htmlFor="search-input">
            Ingrediente
            <input
              id="ingrediente"
              type="radio"
              name="radio"
              data-testid="ingredient-search-radio"
              value="Ingrediente"
            />
          </label>
          <label htmlFor="search-input">
            Nome
            <input
              id="nome"
              type="radio"
              name="radio"
              data-testid="name-search-radio"
              value="Nome"
            />
          </label>
          <label htmlFor="search-input">
            Primeira letra
            <input
              id="primeira-letra"
              type="radio"
              name="radio"
              data-testid="first-letter-search-radio"
              value="Primeira letra"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleClick }
        >
          Search
        </button>
      </div>
    );
  }
}

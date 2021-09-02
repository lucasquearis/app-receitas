import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import fetchSearchIngredientMeals from '../Redux/actions/fetchSearchIngredientMeals';
import fetchSearchLetterMeals from '../Redux/actions/fetchLetterMeals';
import { fetchDrinksByName } from '../Redux/actions/fetchDrinks';
import fetchSearchLetterDrinks from '../Redux/actions/fetchLetterDrinks';
import fetchSearchIngredientDrinks from '../Redux/actions/fetchSearchIngredientDrinks';
import { fetchMealsByName } from '../Redux/actions/fetchMeals';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: '',
      text: '',
      id: '',
      redirect: false,
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
    const {
      setSearchIngredientDrinks,
      setSearchLetterDrinks,
      setSearchNomeDrinks,
    } = this.props;
    if (radio === 'Ingrediente') {
      await setSearchIngredientDrinks(text);
    } else if (radio === 'Nome') {
      await setSearchNomeDrinks(text);
      const { nomeDrink } = this.props;
      if (nomeDrink.length === 1) {
        this.setState({ redirect: true, id: nomeDrink[0].idDrink });
      }
    } else if (radio === 'Primeira letra' && text.length === 1) {
      await setSearchLetterDrinks(text);
    } else { global.alert('Sua busca deve conter somente 1 (um) caracter'); }
  }

  async handleFoods() {
    const { radio, text } = this.state;

    const {
      setSearchIngredient,
      setSearchLetter,
      setSearchNome,
    } = this.props;

    if (radio === 'Ingrediente') {
      await setSearchIngredient(text);
      const { setNome } = this.props;
      if (setNome.length === 1) {
        this.setState({ redirect: true, id: setNome[0].idMeal });
      }
    } else if (radio === 'Nome') {
      await setSearchNome(text);
      const { setNome } = this.props;
      console.log(setNome);
      if (setNome.length === 1) {
        this.setState({ redirect: true, id: setNome[0].idMeal });
      }
    } else if (radio === 'Primeira letra' && text.length === 1) {
      await setSearchLetter(text);
      const { setNome } = this.props;
      if (setNome.length === 1) {
        this.setState({ redirect: true, id: setNome[0].idMeal });
      }
    } else { global.alert('Sua busca deve conter somente 1 (um) caracter'); }
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
    const { redirect, id } = this.state;
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
          onClick={ () => this.handleClick() }
        >
          Search
        </button>
        { redirect && window.location.pathname === '/comidas'
          ? <Redirect to={ `/comidas/${id}` } />
          : redirect && <Redirect to={ `/bebidas/${id}` } /> }

      </div>
    );
  }
}

Search.propTypes = {
  setSearchIngredient: PropTypes.func.isRequired,
  setSearchNome: PropTypes.func.isRequired,
  setSearchLetter: PropTypes.func.isRequired,
  setSearchIngredientDrinks: PropTypes.func.isRequired,
  setSearchNomeDrinks: PropTypes.func.isRequired,
  setSearchLetterDrinks: PropTypes.func.isRequired,
  nome: PropTypes.arrayOf(PropTypes.object).isRequired,
  nomeDrink: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setSearchIngredient: (url) => dispatch(fetchSearchIngredientMeals(url)),

  setSearchNome: (nome) => dispatch(fetchMealsByName(nome)),

  setSearchLetter: (url) => dispatch(fetchSearchLetterMeals(url)),
  setSearchIngredientDrinks: (url) => dispatch(fetchSearchIngredientDrinks(url)),
  setSearchNomeDrinks: (url) => dispatch(fetchDrinksByName(url)),
  setSearchLetterDrinks: (url) => dispatch(fetchSearchLetterDrinks(url)),
});

const mapStateToProps = (state) => ({
  nome: state.foods.meals,
  nomeDrink: state.drinks.drinks,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

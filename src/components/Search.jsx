import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import fetchSearchIngredientMeals from '../Redux/actions/fetchSearchIngredientMeals';
import fetchSearchNomeMeals from '../Redux/actions/fetchSearchNomeMeals';
import fetchSearchLetterMeals from '../Redux/actions/fetchLetterMeals';
import fetchSearchNomeDrinks from '../Redux/actions/fetchSearchNomeDrinks';
import fetchSearchLetterDrinks from '../Redux/actions/fetchLetterDrinks';
import fetchSearchIngredientDrinks from '../Redux/actions/fetchSearchIngredientDrinks';

class Search extends Component {
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

  handleDrinks() {
    const { radio, text } = this.state;
    const {
      setSearchIngredientDrinks,
      setSearchLetterDrinks,
      setSearchNomeDrinks,
    } = this.props;
    if (radio === 'Ingrediente') {
      setSearchIngredientDrinks(text);
    } else if (radio === 'Nome') {
      setSearchNomeDrinks(text);
    } else if (radio === 'Primeira letra' && text.length === 1) {
      setSearchLetterDrinks(text);
    } else { global.alert('Sua busca deve conter somente 1 (um) caracter'); }
  }

  handleFoods() {
    const { radio, text } = this.state;
    const { setSearchIngredient,
      setSearchLetter, setSearchNome, setNome } = this.props;
    if (radio === 'Ingrediente') {
      setSearchIngredient(text);
      if (setSearchIngredient.length === 1) {
        return <Redirect to={ `/comidas/${setNome}` } />;
      }
    } else if (radio === 'Nome') {
      setSearchNome(text);
      // console.log(nome.search.idMeal);
      if (setSearchNome.length === 1) {
        return <Redirect to={ `/comidas/${setNome}` } />;
      }
    } else if (radio === 'Primeira letra' && text.length === 1) {
      setSearchLetter(text);
      if (setSearchLetter.length === 1) {
        return <Redirect to={ `/comidas/${setNome}` } />;
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

Search.propTypes = {
  setSearchIngredient: PropTypes.func.isRequired,
  setSearchNome: PropTypes.func.isRequired,
  setSearchLetter: PropTypes.func.isRequired,
  setSearchIngredientDrinks: PropTypes.func.isRequired,
  setSearchNomeDrinks: PropTypes.func.isRequired,
  setSearchLetterDrinks: PropTypes.func.isRequired,
  setNome: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setSearchIngredient: (url) => dispatch(fetchSearchIngredientMeals(url)),
  setSearchNome: (url) => dispatch(fetchSearchNomeMeals(url)),
  setSearchLetter: (url) => dispatch(fetchSearchLetterMeals(url)),
  setSearchIngredientDrinks: (url) => dispatch(fetchSearchIngredientDrinks(url)),
  setSearchNomeDrinks: (url) => dispatch(fetchSearchNomeDrinks(url)),
  setSearchLetterDrinks: (url) => dispatch(fetchSearchLetterDrinks(url)),
});

const mapStateToProps = (state) => ({
  setNome: state.searchNomeReducer.search,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

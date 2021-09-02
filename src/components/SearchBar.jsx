import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bool, func, arrayOf, shape } from 'prop-types';
import { Redirect } from 'react-router-dom';
import Input from './Input';
import { fetchSearchRecipes } from '../redux/actions';
import './searchbar.css';

const MSG_ALERT = 'Sua busca deve conter somente 1 (um) caracter';

function SearchBar({ foodPage, searchRecipes, recipes }) {
  const [state, setState] = useState({
    query: '',
    consultBy: 'ingredient',
    foodPage,
  });

  const validateConsultBy = (name, value) => {
    const { query, consultBy } = state;
    const checkInput = name === 'query' && value.length > 1;
    const checkQuery = query.length === 1;
    const checkConsultBy = consultBy === 'first-letter';
    if (checkInput && checkQuery && checkConsultBy) {
      const { alert } = window;
      alert(MSG_ALERT);
      return value[0];
    }
    return value;
  };

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: validateConsultBy(name, value) });
  };

  const handleSearch = () => {
    searchRecipes(state);
    setState({ ...state, query: '', consultBy: 'ingredient' });
  };

  const { query, consultBy } = state;

  const typeRecipe = foodPage ? 'comidas' : 'bebidas';
  const typeId = foodPage ? 'idMeal' : 'idDrink';

  return (
    <nav className="nav-search">
      {recipes.length === 1
        ? <Redirect to={ `/${typeRecipe}/${recipes[0][typeId]}` } />
        : ''}
      <Input
        id="search-input"
        type="text"
        onChange={ handleChange }
        name="query"
        value={ query }
        classNameInput="input-searchbar"
      />
      <button
        onClick={ handleSearch }
        data-testid="exec-search-btn"
        type="button"
        className="searchbar-btn"
      >
        Buscar
      </button>
      <div>
        <Input
          id="ingredient-search-radio"
          type="radio"
          onChange={ handleChange }
          name="consultBy"
          textLabel="Ingrediente"
          value="ingredient"
          checked={ consultBy === 'ingredient' }
          classNameInput="radio-searchBar"
        />
        <Input
          id="name-search-radio"
          type="radio"
          onChange={ handleChange }
          name="consultBy"
          textLabel="Nome"
          value="name"
          checked={ consultBy === 'name' }
          classNameInput="radio-searchBar"
        />
        <Input
          id="first-letter-search-radio"
          type="radio"
          onChange={ handleChange }
          name="consultBy"
          textLabel="Primeira Letra"
          value="first-letter"
          checked={ consultBy === 'first-letter' }
          classNameInput="radio-searchBar"
        />
      </div>
    </nav>
  );
}

SearchBar.propTypes = {
  foodPage: bool,
  searchRecipes: func.isRequired,
  recipes: arrayOf(shape()).isRequired,
};

SearchBar.defaultProps = {
  foodPage: false,
};

const mapStateToProps = (state) => ({
  recipes: state.recipesReducer.recipes,
});

const mapDispatchToProps = (dispatch) => ({
  searchRecipes: (state) => dispatch(fetchSearchRecipes(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

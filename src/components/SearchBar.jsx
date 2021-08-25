import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import Input from './Input';
import { fetchSearchRecipes } from '../redux/actions';

const MSG_ALERT = 'Sua busca deve conter somente 1 (um) caracter';

function SearchBar({ foodPage, searchRecipes }) {
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

  return (
    <nav>
      <Input
        id="search-input"
        type="text"
        onChange={ handleChange }
        name="query"
        value={ query }
      />
      <br />
      <Input
        id="ingredient-search-radio"
        type="radio"
        onChange={ handleChange }
        name="consultBy"
        textLabel="Ingrediente"
        value="ingredient"
        checked={ consultBy === 'ingredient' }
      />
      <Input
        id="name-search-radio"
        type="radio"
        onChange={ handleChange }
        name="consultBy"
        textLabel="Nome"
        value="name"
        checked={ consultBy === 'name' }
      />
      <Input
        id="first-letter-search-radio"
        type="radio"
        onChange={ handleChange }
        name="consultBy"
        textLabel="Primeira Letra"
        value="first-letter"
        checked={ consultBy === 'first-letter' }
      />
      <br />
      <button
        onClick={ handleSearch }
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </button>
    </nav>
  );
}

SearchBar.propTypes = {
  foodPage: bool,
  searchRecipes: func.isRequired,
};

SearchBar.defaultProps = {
  foodPage: false,
};

const mapDispatchToProps = (dispatch) => ({
  searchRecipes: (state) => dispatch(fetchSearchRecipes(state)),
});

export default connect(null, mapDispatchToProps)(SearchBar);

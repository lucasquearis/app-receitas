import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import {
  requestByFirstLetter,
  requestByName,
  requestByIngredient,
} from '../../redux/actions/fetchActions';

function SearchBar({ filterName, filterIngredient, filterFistLetter }) {
  const [searchObj, setSearchObj] = useState({ searchText: '', searchRadio: '' });
  const { pathname } = useLocation();
  function handleChange({ target }) {
    const { name, value } = target;
    setSearchObj({
      ...searchObj,
      [name]: value,
    });
  }

  function handleClick() {
    const { searchText, searchRadio } = searchObj;
    if (searchRadio === 'ingredient') {
      filterIngredient(searchText, pathname);
    }
    if (searchRadio === 'name') {
      filterName(searchText, pathname);
    }
    if (searchRadio === 'firstLetter') {
      if (searchText.length === 1) {
        filterFistLetter(searchText, pathname);
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
    }
  }

  return (
    <form>
      <input
        type="text"
        name="searchText"
        data-testid="search-input"
        placeholder="Buscar Receita"
        value={ searchObj.searchText }
        onChange={ handleChange }
      />
      <div onChange={ handleChange }>
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="searchRadio"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="searchRadio"
            value="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            type="radio"
            name="searchRadio"
            value="firstLetter"
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  filterName: (inputVal, path) => dispatch(requestByName(inputVal, path)),
  filterIngredient: (inputVal, path) => dispatch(requestByIngredient(inputVal, path)),
  filterFistLetter: (inputVal, path) => dispatch(requestByFirstLetter(inputVal, path)),
});

SearchBar.propTypes = {
  filterFistLetter: PropTypes.func.isRequired,
  filterName: PropTypes.func.isRequired,
  filterIngredient: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SearchBar);

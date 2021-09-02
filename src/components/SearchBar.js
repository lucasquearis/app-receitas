import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { fetchAPIFilter } from '../services';

export default function SearchBar({ type }) {
  const { setRecipeList } = useContext(AppContext);

  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const [idDetails, setIdDetails] = useState(null);
  const [searchData, setSearchData] = useState({ searchInput: '', searchRadio: '' });
  const { searchInput, searchRadio } = searchData;

  const handleChange = ({ target: { value, name } }) => {
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleClick = async () => {
    if (searchRadio === 'firstLetter' && searchInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    const results = await fetchAPIFilter(type, searchRadio, searchInput);

    if (!results) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    setRecipeList(results);

    if (results.length === 1) {
      setIdDetails(results[0].idMeal || results[0].idDrink);
      setRedirectToDetails(true);
    } else {
      setSearchData({ searchInput: '', searchRadio: '' });
    }
  };

  if (redirectToDetails) return <Redirect to={ `/${type.toLowerCase()}/${idDetails}` } />;

  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="Buscar Receita"
        name="searchInput"
        value={ searchInput }
        onChange={ handleChange }
        data-testid="search-input"
      />
      <div className="search-bar-filters">
        <label htmlFor="ingredient-search-radio">
          <input
            id="ingredient-search-radio"
            type="radio"
            name="searchRadio"
            value="ingredient"
            checked={ searchRadio === 'ingredient' }
            onChange={ handleChange }
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            id="name-search-radio"
            type="radio"
            name="searchRadio"
            value="name"
            checked={ searchRadio === 'name' }
            onChange={ handleChange }
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            id="first-letter-search-radio"
            type="radio"
            name="searchRadio"
            value="firstLetter"
            checked={ searchRadio === 'firstLetter' }
            onChange={ handleChange }
            data-testid="first-letter-search-radio"
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

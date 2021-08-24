import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchIngredientAPI,
  fetchNameAPI,
  fetchLetterAPI,
} from '../redux/actions/mainActions';

function SearchBar() {
  const [search, setSearch] = useState({ result: '', type: '' });
  const dispatch = useDispatch();

  const handleChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  const requestIngredient = (value) => {
    dispatch(fetchIngredientAPI(value));
  };

  const requestName = (value) => {
    dispatch(fetchNameAPI(value));
  };

  const requestLetter = (value) => {
    dispatch(fetchLetterAPI(value));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { result } = search;
    if (search.type === 'ingredient') {
      return requestIngredient(result);
    }
    if (search.type === 'name') {
      return requestName(result);
    }
    if (search.type === 'letter') {
      if (result.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return requestLetter(result);
    }
  };

  const { result } = search;
  return (
    <div>
      <form>
        <input
          value={ result }
          name="result"
          onChange={ handleChange }
          type="text"
          data-testid="search-input"
          className="toggle-input"
        />
        <label htmlFor="ingredient-radio">
          Ingrediente
          <input
            type="radio"
            value="ingredient"
            name="type"
            data-testid="ingredient-search-radio"
            id="ingredient-search-radio"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="dish-name">
          Nome do prato
          <input
            type="radio"
            value="name"
            name="type"
            onChange={ handleChange }
            id="name-search-radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            type="radio"
            value="letter"
            name="type"
            onChange={ handleChange }
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
          onClick={ handleClick }
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchIngredientAPI,
  fetchNameAPI,
  fetchLetterAPI,
} from '../redux/actions/mainActions';
import '../styles/SearchBar.css';

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
    <div className="div-search-bar">
      <form className="search-bar-form">
        <input
          value={ result }
          name="result"
          onChange={ handleChange }
          type="text"
          data-testid="search-input"
          className="toggle-input"
          placeholder="Procure por alguma receita..."
        />
        <form className="radio-form">
          <label htmlFor="ingredient-radio">
            <input
              type="radio"
              value="ingredient"
              name="type"
              data-testid="ingredient-search-radio"
              id="ingredient-search-radio"
              onChange={ handleChange }
            />
            Ingrediente
          </label>
          <label htmlFor="dish-name">
            <input
              type="radio"
              value="name"
              name="type"
              onChange={ handleChange }
              id="name-search-radio"
              data-testid="name-search-radio"
            />
            Nome do prato
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              value="letter"
              name="type"
              onChange={ handleChange }
              id="first-letter-search-radio"
              data-testid="first-letter-search-radio"
            />
            Primeira letra
          </label>
        </form>
        <button
          data-testid="exec-search-btn"
          type="submit"
          onClick={ handleClick }
          className="btn-search-bar"
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

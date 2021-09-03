import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIngredientAPI,
  fetchNameAPI,
  fetchLetterAPI,
  clearSearch,
} from '../redux/actions/mainActions';
import myContext from '../context/myContext';

function SearchBar() {
  const [search, setSearch] = useState({ result: '', type: '' });
  const { removeDisplayList } = useContext(myContext);
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.recipes.foods);
  const drinks = useSelector((state) => state.recipes.foods.drinks);
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
    if (meals || drinks) {
      dispatch(clearSearch());
    }
    removeDisplayList();
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
        <div className="radio-form">
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
        </div>
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

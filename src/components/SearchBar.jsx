import React, { useState } from 'react';
import {
  getDataByIngredient,
  getDataByName,
  getDataByFirstLetter,
} from '../services/api';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [filterIngredient, setFilterIngredient] = useState(false);
  const [filterName, setFilterName] = useState(false);
  const [filterFirstLetter, setFilterFirstLetter] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleClick = async () => {
    if (filterIngredient && !filterName && !filterFirstLetter) {
      await getDataByIngredient(inputValue)
        .then((response) => setData(response));
    } else if (filterName && !filterIngredient && !filterFirstLetter) {
      await getDataByName(inputValue)
        .then((response) => setData(response.meals));
    } else if (filterFirstLetter && !filterIngredient && !filterName) {
      await getDataByFirstLetter(inputValue)
        .then((response) => setData(response));
    }
    return data;
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ inputValue }
        onChange={ (e) => handleChange(e) }
      />
      <label htmlFor="ingredient-radio">
        Ingrediente
        <input
          onChange={ () => setFilterIngredient(true) }
          id="ingredient-radio"
          data-testid="ingredient-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="name-radio">
        Nome
        <input
          onChange={ () => setFilterName(true) }
          id="name-radio"
          data-testid="name-search-radio"
          type="radio"
        />
      </label>
      <label htmlFor="letter-radio">
        Primeira letra
        <input
          onChange={ () => setFilterFirstLetter(true) }
          id="letter-radio"
          data-testid="first-letter-search-radio"
          type="radio"
        />
      </label>
      <button onClick={ handleClick } type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
}

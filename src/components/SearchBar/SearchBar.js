import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState({
    textValue: '',
    radioValue: '',
  });
  const [items, setItems] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const fetchApi = async (url) => {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
  };

  const searchOnClick = async () => {
    if (search.radioValue === 'Ingredientes') {
      const ingredients = await fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search.textValue}`);
      setItems(ingredients);
    } else if (search.radioValue === 'Nome') {
      const name = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.textValue}`);
      setItems(name);
    } else if (search.textValue.length === 1) {
      const firstLetter = await fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search.textValue}`);
      setItems(firstLetter);
    } else alert('Sua busca deve conter somente 1 (um) caracter');
  };

  console.log(items);

  return (
    <div data-testid="search-top-btn">
      <input
        type="text"
        name="textValue"
        data-testid="search-input"
        placeholder="Busque por uma receita"
        onChange={ handleChange }
      />
      <div name="radioValue" onChange={ handleChange }>
        <label htmlFor="ingredients">
          Ingredientes
          <input
            type="radio"
            id="ingredients"
            name="radioValue"
            value="Ingredientes"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            type="radio"
            id="name"
            name="radioValue"
            value="Nome"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            type="radio"
            id="first-letter"
            name="radioValue"
            value="Primeira letra"
            data-testid="first-letter-search-radio"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchOnClick }
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;

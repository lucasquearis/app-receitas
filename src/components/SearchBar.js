import React, { useState, useEffect, useContext } from 'react';
import FoodContext from '../context/FoodContext';
import DrinksContext from '../context/DrinksContext';
import Input from './Input';
import Button from './Button';

const SearchBar = (location) => {
  const [filterState, setFilterState] = useState({
    searchText: '',
    search: '',
  });
  const [disabled, setDisabled] = useState(true);
  const { setFoodFilter, setMealsByCategories } = useContext(FoodContext);
  const { setDrinkFilter, setDrinksByCategories } = useContext(DrinksContext);

  function handleChange({ target }) {
    const { name, value } = target;
    setFilterState({
      ...filterState,
      [name]: value,
    });
  }

  useEffect(() => {
    const { searchText, search } = filterState;
    if (searchText && search) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [filterState]);

  function handleClick() {
    const { searchText, search } = filterState;
    const { location: { pathname } } = location;
    if (search === 'Primeira letra' && searchText.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (pathname === '/comidas' || pathname === '/comidas/') {
      setFoodFilter(filterState);
      setMealsByCategories(false);
    } else if (pathname === '/bebidas' || pathname === '/bebidas/') {
      setDrinkFilter(filterState);
      setDrinksByCategories(false);
    }
  }

  return (
    <div className="search-bar">
      <Input
        textInput="text"
        datatestId="search-input"
        name="searchText"
        placeH="Digite um texto"
        onChange={ handleChange }
      />
      <div className="radio-container">
        <Input
          textInput="radio"
          datatestId="ingredient-search-radio"
          name="search"
          onChange={ handleChange }
          id="ingredient"
          textLabel="Ingrediente"
          value="Ingrediente"
        />
        <Input
          textInput="radio"
          datatestId="name-search-radio"
          name="search"
          onChange={ handleChange }
          id="name"
          textLabel="Nome"
          value="Nome"
        />
        <Input
          textInput="radio"
          datatestId="first-letter-search-radio"
          name="search"
          onChange={ handleChange }
          placeH="sadsa"
          id="letter"
          textLabel="Primeira letra"
          value="Primeira letra"
        />
      </div>
      <Button
        onClick={ handleClick }
        datatestId="exec-search-btn"
        disabled={ disabled }
        btnText="Pesquisar"
      />
    </div>
  );
};

export default SearchBar;

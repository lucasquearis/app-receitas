import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchFoodByFilters } from '../services/mealAPI';
import { fetchCocktailByFilters } from '../services/cocktailAPI';
import FoodContext from '../context/FoodContext';
import DrinkContext from '../context/DrinkContext';

function SearchBar() {
  const defaultFilters = {
    inputSearch: '',
    ingredient: false,
    name: false,
    firstLetter: false,
  };

  const [filters, setFilters] = useState(defaultFilters);
  const { setFoods } = useContext(FoodContext);
  const { setDrinks } = useContext(DrinkContext);

  const { drinks } = useContext(DrinkContext);
  const { foods } = useContext(FoodContext);

  if (drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (drinks !== null && drinks.length === 1) {
    return <Redirect to={ `bebidas/${drinks[0].idDrink}` } />;
  }

  if (foods === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (foods !== null && foods.length === 1) {
    return <Redirect to={ `comidas/${foods[0].idMeal}` } />;
  }

  function handleChange({ target }) {
    const obj = { ...filters };
    obj[target.name] = target.value;
    setFilters(obj);
  }

  function handleChangeCheck({ target }) {
    const obj = { ...defaultFilters };
    obj.inputSearch = filters.inputSearch;
    obj[target.value] = target.checked;
    setFilters(obj);
  }

  async function handleSearch(searchFilters) {
    if (window.location.pathname.includes('comidas')) {
      const foodList = await fetchFoodByFilters(searchFilters);
      setFoods(foodList);
    } else {
      const drinkList = await fetchCocktailByFilters(searchFilters);
      setDrinks(drinkList);
    }
  }

  return (
    <section>
      <label htmlFor="searchText">
        Search:
        <input
          id="searchText"
          type="text"
          name="inputSearch"
          value={ filters.inputSearch }
          onChange={ handleChange }
          data-testid="search-input"
          placeholder="Find Recipe"
        />
      </label>
      <label htmlFor="ingredientSearch">
        <input
          id="ingredientSearch"
          type="radio"
          name="search"
          value="ingredient"
          onChange={ handleChangeCheck }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="nameSearch">
        <input
          id="nameSearch"
          type="radio"
          name="search"
          value="name"
          onChange={ handleChangeCheck }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="firstLetterSearch">
        <input
          id="firstLetterSearch"
          type="radio"
          name="search"
          value="firstLetter"
          onChange={ handleChangeCheck }
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => handleSearch(filters) }
      >
        Find
      </button>
    </section>
  );
}

export default SearchBar;

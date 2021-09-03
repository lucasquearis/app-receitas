import React, { useState, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import FetchSearch from '../Services/FetchSearch';
import AppContext from '../Context/AppContext';
import './search-bar.css';

function SearchBar() {
  const [state, setState] = useState({ oneRecipe: '' });
  const { pathname } = useLocation();
  const { setSearch, setLoadSearch } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    // const value = target.type === 'checkbox' ? target.checked : target.value
    setState({
      ...state, [name]: value,
    });
  };

  const recipesSearch = async () => {
    const contentSearch = state.inputSearch;
    // console.log(state.radioSearch);
    let results;
    const typeSearch = state.radioSearch;
    if (state.radioSearch === 'ingredient') {
      results = await FetchSearch(pathname, typeSearch, contentSearch);
      setState({
        ...state, results,
      });
    }
    if (state.radioSearch === 'name') {
      results = await FetchSearch(pathname, typeSearch, contentSearch);
      setState({
        ...state, results,
      });
    }

    if (state.radioSearch === 'firstLetter') {
      if (contentSearch.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        results = await FetchSearch(pathname, typeSearch, contentSearch);
        setState({
          ...state, results,
        });
      }
    }
    console.log(results);
    if (!results) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }

    if (results) {
      if (results.length === 1 && pathname === '/comidas') {
      // console.log(results[0].idMeal);
        setState({
          ...state, oneRecipe: results[0].idMeal,
        });
      }
      if (results.length === 1 && pathname === '/bebidas') {
        setState({
          ...state, oneRecipe: results[0].idDrink,
        });
      }
    }
    const maxRecipes = 12;
    setSearch(results.splice(0, maxRecipes));
    setLoadSearch(true);
    return results;
  };

  const redirectTo = () => {
    if (state.oneRecipe !== '') {
      return <Redirect to={ `${pathname}/${state.oneRecipe}` } />;
    }
  };

  return (
    <div>
      { redirectTo()}
      <form>
        <input
          type="text"
          data-testid="search-input"
          className="input-text"
          name="inputSearch"
          placeholder="Pesquisar Receita"
          onChange={ handleChange }
        />
        <div className="container-radios">
          <label htmlFor="radioSearch-ingredient">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              id="radioSearch-ingredient"
              className="radio"
              name="radioSearch"
              onChange={ handleChange }
              value="ingredient"
            />
            Ingrediente
          </label>
          <label htmlFor="radioSearch-name">
            <input
              type="radio"
              data-testid="name-search-radio"
              id="radioSearch-name"
              className="radio"
              name="radioSearch"
              onChange={ handleChange }
              value="name"
            />
            Nome
          </label>
          <label htmlFor="radioSearch">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              id="radioSearch"
              className="radio"
              name="radioSearch"
              onChange={ handleChange }
              value="firstLetter"
            />
            Primeira letra
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          className="button-filter"
          onClick={ recipesSearch }
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

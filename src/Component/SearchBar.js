import React, { useState, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import FetchSearch from '../Services/FetchSearch';
import AppContext from '../Context/AppContext';

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
    // const contentSearch = state.inputSearch;
    let results;
    const typeSearch = state.radioSearch;
    if (state.radioSearch === 'ingredient') {
      results = await FetchSearch(pathname, typeSearch, state.inputSearch);
      setState({
        ...state, results,
      });
    }
    if (state.radioSearch === 'name') {
      results = await FetchSearch(pathname, typeSearch, state.inputSearch);
      setState({
        ...state, results,
      });
    }

    if (state.radioSearch === 'firstLetter') {
      if (state.inputSearch.length > 1) {
        /* eslint-disable */
        alert('Sua busca deve conter somente 1 (um) caracter');
         /* eslint-enable */
      } else {
        results = await FetchSearch(pathname, typeSearch, state.inputSearch);
        setState({
          ...state, results,
        });
      }
    }
    if (results) {
      if (results.length === 1 && pathname.indexOf('comidas') >= 0) {
        setState({
          ...state, oneRecipe: results[0].idMeal,
        });
      }
      if (results.length === 1 && pathname.indexOf('bebidas') >= 0) {
        setState({
          ...state, oneRecipe: results[0].idDrink,
        });
      }
      const maxRecipes = 12;
      setSearch(results.splice(0, maxRecipes));
      setLoadSearch(true);
    } else {
      /* eslint-disable */
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      /* eslint-enable */
    }
    return results;
  };

  const redirectTo = () => {
    if (state.oneRecipe !== '') {
      return <Redirect to={ `${pathname}/${state.oneRecipe}` } />;
    }
  };

  return (
    <>
      { redirectTo()}
      <form>
        <input
          type="text"
          data-testid="search-input"
          name="inputSearch"
          placeholder="Pesquisar Receita"
          onChange={ handleChange }
        />
        <label htmlFor="radioSearch">
          Ingrediente
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="radioSearch"
            onChange={ handleChange }
            value="ingredient"

          />
        </label>
        <label htmlFor="radioSearch">
          Nome
          <input
            type="radio"
            data-testid="name-search-radio"
            name="radioSearch"
            onChange={ handleChange }
            value="name"
          />
        </label>
        <label htmlFor="radioSearch">
          Primeira letra
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="radioSearch"
            onChange={ handleChange }
            value="firstLetter"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ recipesSearch }
        >
          Buscar
        </button>
      </form>
    </>
  );
}

export default SearchBar;

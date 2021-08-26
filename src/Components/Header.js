import React, { useState, useContext } from 'react';
import './Header.css';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfilIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import Input from './Forms/Input';
import InputRadio from './Forms/InputRadio';
import RecipesContext from '../Context/RecipesContext';
import * as comidasAPI from '../service/ComidasAPI';
import * as bebidasAPI from '../service/BebidasAPI';

export default function Header(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchForm, setSearchFor] = useState({ searchValue: '', searchType: '' });

  const { title, searchIcon } = props;

  const { recipes, setRecipes } = useContext(RecipesContext);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const showSearchIcon = () => {
    if (searchIcon) {
      return (
        <button
          type="button"
          onClick={ handleSearchClick }
          className="search-icon-button"
        >
          <img data-testid="search-top-btn" src={ SearchIcon } alt="procurar" />
        </button>
      );
    }

    return (
      <div />
    );
  };

  const handleChange = ({ target: { name, value } }) => {
    setSearchFor({ ...searchForm, [name]: value });
  };

  const searchDrinkRecipe = () => {
    const { searchType, searchValue } = searchForm;
    if (searchType === 'ingredientes') {
      return bebidasAPI.buscarBebidasIngrediente(searchValue)
        .then((result) => setRecipes(result));
    }

    if (searchType === 'primeira-letra') {
      if (searchValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return bebidasAPI.buscarBebidasLetra(searchValue)
        .then((result) => setRecipes(result));
    }

    if (searchType === 'nome') {
      return bebidasAPI.buscarBebidaNome(searchValue)
        .then((result) => setRecipes(result));
    }

    return alert('Digite um valor no campo!');
  };

  const searchFoodRecipe = () => {
    const { searchType, searchValue } = searchForm;
    if (searchType === 'ingredientes') {
      return comidasAPI.buscarComidasIngrediente(searchValue)
        .then((result) => setRecipes(result));
    }

    if (searchType === 'primeira-letra') {
      if (searchValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      return comidasAPI.buscarComidasLetra(searchValue)
        .then((result) => setRecipes(result));
    }

    if (searchType === 'nome') {
      return comidasAPI.buscarComidaNome(searchValue)
        .then((result) => setRecipes(result));
    }

    return alert('Digite um valor no campo!');
  };

  const searchRecipeByPath = () => {
    const { location: { pathname } } = window;
    if (pathname === '/comidas') {
      return searchFoodRecipe();
    }
    return searchDrinkRecipe();
  };

  const redirect = () => {
    let id = 'idMeal';
    if (window.location.pathname === '/bebidas') {
      id = 'idDrink';
    }
    return (
      recipes.length === 1 && <Redirect
        to={ `${window.location.pathname}/${recipes[0][id]}` }
      />
    );
  };

  const searchBar = () => (
    <form className="search-form">
      { redirect() }
      <Input
        value={ searchForm.searchValue }
        name="searchValue"
        handleChange={ handleChange }
        testId="search-input"
      />
      <div onChange={ handleChange }>
        <InputRadio
          id="ingredientes-radio"
          title="Ingredientes"
          className="input-radio"
          name="searchType"
          value="ingredientes"
          testid="ingredient-search-radio"
        />
        <InputRadio
          id="nome-radio"
          title="Nome"
          className="input-radio"
          name="searchType"
          value="nome"
          testid="name-search-radio"
        />
        <InputRadio
          id="primeira-letra-radio"
          title="Primeira letra"
          className="input-radio"
          name="searchType"
          value="primeira-letra"
          testid="first-letter-search-radio"
        />
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchRecipeByPath }
      >
        Buscar
      </button>
    </form>
  );

  return (
    <section>
      <header className="header">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ PerfilIcon } alt="perfil" />
        </Link>
        <h3 data-testid="page-title">{ title }</h3>
        { showSearchIcon() }
      </header>
      { showSearch && searchBar() }
    </section>
  );
}

Header.defaultProps = {
  searchIcon: false,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool,
};

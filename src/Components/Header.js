import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfilIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import Input from './Forms/Input';
import InputRadio from './Forms/InputRadio';

export default function Header(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchForm, setSearchFor] = useState({ searchValue: '', searchType: '' });

  const { title, searchIcon } = props;

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

  const searchBar = () => (
    <form className="search-form">
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
      <button type="button" data-testid="exec-search-btn">Buscar</button>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import './css/Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ title, noSearchButton }) => {
  const [searchBar, setShowBar] = useState(false);
  const [searchInput, setInput] = useState('');
  const [searchRadio, setRadio] = useState('');
  const [searchButton, setButton] = useState('');

  const showSearch = () => (searchBar ? setShowBar(false) : setShowBar(true));

  const handleChange = ({ target }) => {
    const { value, name } = target;
    return name === 'searchInput' ? setInput(value) : setRadio(value);
  };

  const buttonFunc = () => {
    console.log('va;ls');
  };

  if (noSearchButton) {
    return (
      <>
        <div
          className="header-container"
        >
          <Link to="/perfil">
            <button
              type="button"
              className="profile-icon-container"
            >
              <img
                data-testid="profile-top-btn"
                className="profile-icon"
                src={ profileIcon }
                alt="Profile Icon"
              />
            </button>
          </Link>
          <div
            className="title-container"
          >
            <h1
              className="title-content"
              data-testid="page-title"
            >
              { title }
            </h1>
          </div>
        </div>
        {
          searchBar
            ? (
              <div className="search-bar-container">
                <Input
                  type="text"
                  id="searchBar"
                  data-testid="search-input"
                  className="search-input"
                  name="searchInput"
                  value={ searchInput }
                  placeholder="Pesquise aqui o que você quer comer :)"
                  onChange={ handleChange }
                  required={ false }
                />
                <div
                  className="radio-container"
                >
                  <Input
                    labelText="Ingrediente"
                    type="radio"
                    data-testid="ingredient-search-radio"
                    className="search-radio"
                    name="ingredient"
                    value="ingredient"
                    onChange={ handleChange }
                  />
                  <Input
                    labelText="Nome"
                    type="radio"
                    data-testid="name-search-radio"
                    className="search-radio"
                    name="name"
                    value="name"
                    onChange={ handleChange }
                  />
                  <Input
                    labelText="Primeira letra"
                    type="radio"
                    data-testid="first-letter-search-radio"
                    className="search-radio"
                    name="firstLetter"
                    value="firstLetter"
                    onChange={ handleChange }
                  />
                  <button
                    type="button"
                    data-testid="exec-search-btn"
                    className="exec-search-btn"
                    onClick={ buttonFunc }
                  >
                    PESQUISAR
                  </button>
                </div>
              </div>)
            : ''
        }
      </>
    );
  }

  return (
    <>
      <div
        className="header-container"
      >
        <Link to="/perfil">
          <button
            type="button"
            className="profile-icon-container"
          >
            <img
              data-testid="profile-top-btn"
              className="profile-icon"
              src={ profileIcon }
              alt="Profile Icon"
            />
          </button>
        </Link>
        <div
          className="title-container"
        >
          <h1
            className="title-content"
            data-testid="page-title"
          >
            { title }
          </h1>
        </div>

        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ showSearch }
          src={ searchIcon }
        >
          <img
            src={ searchIcon }
            alt="Profile Icon"
            className="search-element"
          />
        </button>
      </div>
      {

        searchBar
          ? (
            <div
              className="search-bar-container"
              data-testid="search-input"
            >
              <Input
                type="text"
                data-testid="search-input"
                className="search-input"
                name="searchInput"
                value={ searchInput }
                placeholder="Pesquise aqui o que você quer comer :)"
                onChange={ handleChange }
                required={ false }
              />
              <div
                className="radio-container"
              >
                <Input
                  labelText="Ingrediente"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  className="search-radio"
                  name="ingredient"
                  value="ingredient"
                  onChange={ handleChange }
                />
                <Input
                  labelText="Nome"
                  type="radio"
                  data-testid="name-search-radio"
                  className="search-radio"
                  name="name"
                  value="name"
                  onChange={ handleChange }
                />
                <Input
                  labelText="Primeira letra"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  className="search-radio"
                  name="firstLetter"
                  value="firstLetter"
                  onChange={ handleChange }
                />
              </div>
              <div>
                <button
                  type="button"
                  data-testid="exec-search-btn"
                  className="exec-search-btn"
                  onClick={ buttonFunc }
                >
                  PESQUISAR
                </button>
              </div>
            </div>)
          : ''
      }
    </>
  );
};

export default Header;

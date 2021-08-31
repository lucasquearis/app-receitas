import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function HeaderSearch({ title }) {
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [ingredient, setIngredient] = useState(null);

  function handleSearch() {
    if (!show) {
      return setShow(true);
    }
    setShow(false);
  }

  useEffect(() => {
    if (state) {
      setShow(true);
      setIngredient(state.ingredient);
    }
  }, [state]);

  return (
    <div>
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="imagem do link do perfil"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ handleSearch }
        data-testid="search-top-btn"
        src={ searchIcon }
        id="button"
      >
        <img
          src={ searchIcon }
          alt="imagem do link de pesquisa"
        />
      </button>
      {(show) ? <Search ingredient={ ingredient } /> : null }
    </div>
  );
}

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSearch;

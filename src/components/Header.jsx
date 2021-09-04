import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './componentCSS/HeaderFood.css';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import SubHeader from './SubHeader';

export default function Header({ title }) {
  const [search, setSearch] = useState(false);
  const showSearch = () => setSearch(!search);

  return (
    <header className="header-food">
      <SubHeader title={ title } />
      <button
        type="button"
        className="search-btn"
        onClick={ showSearch }
      >
        <img
          data-testid="search-top-btn"
          alt="button-icon"
          src={ searchIcon }
        />
      </button>
      { search && <SearchBar title={ title } />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

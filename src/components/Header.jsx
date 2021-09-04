import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.svg';
import headerBg from '../images/header_bg.png';
import SubHeader from './SubHeader';

export default function Header({ title }) {
  const [search, setSearch] = useState(false);
  const showSearch = () => setSearch(!search);

  return (
    <header className="header__whole-div">
      <img className="header__background_img" src={ headerBg } alt="Header Bg" />
      <SubHeader title={ title } />
      <button
        type="button"
        className="header__search-btn"
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

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileicon from '../../images/profileIcon.svg';
import searchicon from '../../images/searchIcon.svg';
import HEADERSEARCHBAR from '../../services/data';
import SearchBar from '../SearchBar';

function Header({ children }) {
  const history = useHistory();
  console.log(history);
  return (
    <>
      <header>
        <Link to="/perfil">
          <button type="button">
            <input
              type="image"
              data-testid="profile-top-btn"
              src={ profileicon }
              alt="profile"
            />
          </button>
        </Link>
        <h4 data-testid="page-title">
          {children}
        </h4>

        { HEADERSEARCHBAR
          .find((item) => item === history.location.pathname)
            && (
              <button type="button">
                <input
                  type="image"
                  data-testid="search-top-btn"
                  src={ searchicon }
                  alt="Search"
                />
              </button>)}
      </header>
      <SearchBar />
    </>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;

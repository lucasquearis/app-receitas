import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileicon from '../../images/profileIcon.svg';
import searchicon from '../../images/searchIcon.svg';
import HEADERSEARCHBAR from '../../services/data';
import SearchBar from '../SearchBar';
import styles from './Header.module.css';

function Header({ children }) {
  const history = useHistory();
  const [hideSearchBar, setHideSearchBar] = React.useState(false);
  const ShowHideSearchBar = () => setHideSearchBar(!hideSearchBar);
  return (
    <header className={ styles.buttonSuperior }>
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

      {
        HEADERSEARCHBAR
          .find((item) => item === history.location.pathname)
          && (
            <button type="button">
              <input
                type="image"
                data-testid="search-top-btn"
                src={ searchicon }
                alt="Search"
                onClick={ ShowHideSearchBar }
              />
              {hideSearchBar && <SearchBar />}
            </button>)
      }
    </header>

  );
}
Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;

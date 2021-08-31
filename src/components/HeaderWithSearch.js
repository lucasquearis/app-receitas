import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import useRedirect from '../hooks/useRedirect';

function HeaderWithSearch({ children }) {
  const { shouldRedirect, redirect } = useRedirect();
  const [visibleSearch, setVisibleSearch] = useState(false);

  if (redirect.should) return <Redirect to={ redirect.path } />;

  const handleToggleClass = () => setVisibleSearch((currState) => !currState);

  return (
    <div>
      <header className="header-search">
        <Button type="button" onClick={ () => shouldRedirect('/perfil') }>
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="ícone de perfil"
          />
        </Button>
        <h2 data-testid="page-title">{ children }</h2>
        <Button type="button" onClick={ handleToggleClass }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="ícone de busca"
          />
        </Button>
      </header>
      { visibleSearch
        && (
          <div>
            <SearchBar />
          </div>) }
    </div>
  );
}

HeaderWithSearch.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderWithSearch;

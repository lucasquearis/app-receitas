import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HeaderWrapper, ProfileIcon, PageTitle, SearchIcon } from './styles';
import SearchBar from '../SearchBar';
import { titleGenerator } from '../../services';
import Filters from '../Filters';

const Header = ({ title, routeParams, hideSearch }) => {
  const [searchBar, setSearchBar] = useState(false);
  if (routeParams[0] === undefined
    || routeParams[0] === 'comidas'
    || routeParams[0] === 'bebidas'
    || routeParams[0] === 'ingredientes') {
    return (
      <HeaderWrapper>
        <Link to="/perfil">
          <ProfileIcon
            data-testid="profile-top-btn"
            src="/images/profileIcon.svg"
            alt="Profile Icon"
          />
        </Link>
        <PageTitle
          data-testid="page-title"
        >
          {`${title} ${titleGenerator(routeParams)}`}
        </PageTitle>
        {

          hideSearch && routeParams[1] !== 'area' ? null
            : (
              <>
                <SearchIcon
                  data-testid="search-top-btn"
                  src="/images/searchIcon.svg"
                  alt="Search Icon"
                  onClick={ () => setSearchBar(!searchBar) }
                />
                {
                  searchBar ? <SearchBar
                    placeholder="Digite sua busca..."
                    data-testid="search-input"
                    type={ title }
                  /> : <Filters title2={ routeParams[1] } title={ title } />
                }
              </>
            )
        }

      </HeaderWrapper>
    );
  }
  return null;
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hideSearch: PropTypes.bool,
  routeParams: PropTypes.arrayOf(String),
};

Header.defaultProps = {
  hideSearch: undefined,
  routeParams: undefined,
};

export default Header;

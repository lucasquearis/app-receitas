import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import profileIconImg from '../../images/profileIcon.svg';
import searchIconImg from '../../images/searchIcon.svg';
import { HeaderSection, ImgProfile, HeaderTitle } from './styles';

function Header({ title, searchIcon }) {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <HeaderSection>
      <Link to="/perfil" data-testid="profile-top-btn" src={ profileIconImg }>
        <ImgProfile src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="profile-button" />
      </Link>
      <HeaderTitle data-testid="page-title">{title}</HeaderTitle>
      {searchIcon ? (
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => setDisplaySearchBar(!displaySearchBar) }
          src={ searchIconImg }
        >
          <img src={ searchIconImg } alt="search-button" width="50px" height="50px" />
        </button>)
        : (
          <button
            type="button"
            style={ { visibility: 'hidden' } }
          >
            <img src={ searchIconImg } alt="search-button" width="50px" height="50px" />
          </button>)}
      {displaySearchBar && <SearchBar />}
    </HeaderSection>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  searchIcon: propTypes.bool,
};
Header.defaultProps = {
  searchIcon: false,
};

export default Header;

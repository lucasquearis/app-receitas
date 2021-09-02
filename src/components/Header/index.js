import React, { useState, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';
import { useHeaderTitle } from '../../hooks';
import { HeaderWrapper } from './style';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ showSearchBtn }) { //
  const [redirect, setRedirect] = useState(false); // esse estado local começa como false.
  const { showBar, setShowBar } = useContext(AppContext);

  const { pathname } = useLocation();
  const [headerTitle] = useHeaderTitle(pathname);

  if (redirect) {
    return <Redirect to="/perfil" />;
  }
  return (
    <HeaderWrapper>
      <input
        type="image"
        data-testid="profile-top-btn"
        alt="icone-perfil"
        src={ profileIcon }
        onClick={ () => setRedirect(true) }
      />
      <h1
        data-testid="page-title"
      >
        { headerTitle }
      </h1>
      { showSearchBtn && <input
        type="image"
        data-testid="search-top-btn"
        alt="icone-busca"
        src={ searchIcon }
        onClick={ () => setShowBar(!showBar) }
      /> }
    </HeaderWrapper> // ao clicar no ícone de busca, vai mudar o estado Global.
  );
}
Header.propTypes = {
  showSearchBtn: PropTypes.bool.isRequired,
};
export default Header;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Image } from 'react-bootstrap';
import searchIcon from '../images/searchIcon.svg';
import DrinksSearchBar from './DrinksSearchBar';
import RecipesSearchBar from './RecipesSearchBar';
import profileIcon from '../images/profileIcon.svg';
import './header.css';

function Header(props) {
  const { titulo, showProfileIcon, pathname } = props;
  const [showSearchBar, setShowSearchBar] = useState(false);

  const revealSearchBar = () => {
    if (!showSearchBar) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  const searchBar = () => {
    if (pathname === '/comidas' && showSearchBar === true) {
      return <RecipesSearchBar />;
    }
    if (pathname === '/bebidas' && showSearchBar === true) {
      return <DrinksSearchBar />;
    }
  };

  const revealIconSearch = () => {
    if (showProfileIcon === 'sim') {
      return (
        <Image
          onClick={ revealSearchBar }
          src={ searchIcon }
          alt="Ícone de pesquisa"
          data-testid="search-top-btn"
        />
      );
    }
    return (null);
  };

  return (
    <Container className="header">
      <Row
        style={ { justifyContent: 'space-evenly', alignItems: 'center' } }
      >
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Avatar do usuário"
            data-testid="profile-top-btn"
          />
        </Link>

        <h3 data-testid="page-title">{titulo}</h3>

        {revealIconSearch()}
        {searchBar()}
      </Row>
    </Container>
  );
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
  showProfileIcon: PropTypes.string,
  pathname: PropTypes.string,
};

Header.defaultProps = {
  showProfileIcon: <p>Sem valor</p>,
  pathname: <p>Sem valor</p>,

};

export default Header;

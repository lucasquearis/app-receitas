import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [searchBar, setSearchBar] = useState(false);
  const { title, renderSearch } = props;
  const showAndHide = () => {
    if (searchBar === true) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Link to="/perfil">
            <img src={ Profile } data-testid="profile-top-btn" alt="Icone de Perfil" />
          </Link>
        </Navbar.Brand>
        <h1 data-testid="page-title" className="justify-content-center">{ title }</h1>
        {renderSearch ? <SearchBar onClick={ showAndHide } search={ Search } /> : <div />}
        { searchBar
          ? <div data-testid="search-input"><Form.Control type="text" /></div>
          : null}
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderSearch: PropTypes.bool,
};

Header.defaultProps = {
  renderSearch: true,
};

export default Header;

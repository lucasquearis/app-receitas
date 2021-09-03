import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import Search from './Search';
import header from './style/header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const { searchBar } = this.state;
    this.setState({
      searchBar: !searchBar,
    });
  }

  render() {
    const { searchBar } = this.state;
    const { title, showSearchBottom } = this.props;
    return (
      <div className="header">
        <header className="header">
          <Link to="/perfil">
            <button
              type="button"
            >
              <img src={ profile } alt="profile" data-testid="profile-top-btn" />
            </button>
          </Link>
          <h2 data-testid="page-title">{ title }</h2>
          { showSearchBottom ? (
            <button
              type="button"
              onClick={ this.handleSearch }
            >
              <img
                src={ search }
                alt="search"
                data-testid="search-top-btn"
              />
            </button>) : null }
        </header>
        { searchBar ? <Search /> : null }
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearchBottom: PropTypes.bool.isRequired,
};

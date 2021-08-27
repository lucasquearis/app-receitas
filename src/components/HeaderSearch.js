import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

class HeaderSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const { show } = this.state;
    if (show === false) {
      this.setState({ show: true });
    } else { this.setState({ show: false }); }
  }

  render() {
    const { title } = this.props;
    const { show } = this.state;
    return (
      <div>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="imagem do link do perfil"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <button
          type="button"
          onClick={ this.handleSearch }
          data-testid="search-top-btn"
          src={ searchIcon }
          id="button"
        >
          <img
            src={ searchIcon }
            alt="imagem do link de pesquisa"
          />
        </button>
        {(show) ? <Search /> : null }
      </div>
    );
  }
}

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSearch;

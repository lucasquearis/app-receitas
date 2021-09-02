import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

class HeaderSearch extends React.Component {
  handleSearch() {
    const search = document.querySelector('#searchbar');
    console.log(search);
    if (search.style.visibility === 'hidden') {
      search.style.visibility = 'visible';
    } else {
      search.style.visibility = 'hidden';
    }
  }

  render() {
    const { title } = this.props;
    return (
      <div className="header-profile">
        <div className="header-title">
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="imagem do link do perfil"
              />
          </Link>
          <h1 data-testid="page-title">{title}</h1>
        </div>
      </div>
    );
  }
}

HeaderSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSearch;

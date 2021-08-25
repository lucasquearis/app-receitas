import React from 'react';
import PropTypes from 'prop-types';

function SearchBar(props) {
  const { onClick, search } = props;
  return (
    <button type="button" onClick={ onClick }>
      <img
        src={ search }
        className="justify-content-end"
        data-testid="search-top-btn"
        alt="Icone de Perfil"
      />
    </button>
  );
}

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchBar;

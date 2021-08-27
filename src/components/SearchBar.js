import React from 'react';
import PropTypes from 'prop-types';
import InputsSearch from './InputsSearch';
import "./Header.css";


function SearchBar({ display }) {
  const displaySearchBar = (bool) => {
    if (bool) {
      return (
        <InputsSearch />
      );
    }
  };

  return (
    <div className="xablau">
      {displaySearchBar(display)}
    </div>
  );
}

SearchBar.propTypes = {
  display: PropTypes.bool.isRequired,
};

export default SearchBar;

import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ display }) {
  const displaySearchBar = (bool) => {
    if (bool) {
      return (
        <input type="text" data-testid="search-input" />
      );
    }
  };

  return (
    <div>
      {displaySearchBar(display)}
    </div>
  );
}

SearchBar.propTypes = {
  display: PropTypes.bool.isRequired,
};

export default SearchBar;

import React from 'react';
import { func } from 'prop-types';
import SearchIcon from '../../images/searchIcon.svg';

function Search({ onClick }) {
  const buttonStyle = { border: 'none',
    background: 'none' };
  return (
    <button
      type="button"
      style={ buttonStyle }
      onClick={ onClick }
    >
      <img src={ SearchIcon } alt="Search Icon" data-testid="search-top-btn" />
    </button>
  );
}

Search.propTypes = {
  onClick: func.isRequired,
};

export default Search;

import React from 'react';

function SearchBar() {
  return (
    <div>
      <h2>SearchBar</h2>
      <input
        type="text"
        data-testid="search-input"
      />
    </div>
  );
}

export default SearchBar;

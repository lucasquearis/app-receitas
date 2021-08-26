import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <div>
        <label htmlFor="search-input">
          Search:
          <input type="text" data-testid="search-input" />
        </label>
      </div>
    );
  }
}

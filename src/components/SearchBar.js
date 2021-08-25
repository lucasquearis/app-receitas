import React from 'react';
import { Form } from 'react-bootstrap';

function SearchBar() {
  return (
    <div data-testid="search-input">
      <Form.Control type="text" />
    </div>
  );
}

export default SearchBar;

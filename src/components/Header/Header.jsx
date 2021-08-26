import React from 'react';
import HeaderSearchBar from './Header-SearchBar/HeaderSearchBar';

const Header = ({ page }) => (
  <>
    <HeaderSearchBar page={ page } />
    <h1>Im a Header</h1>
  </>
);

export default Header;

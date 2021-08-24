import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { string } from 'prop-types';
import Profile from './Profile';
import Search from './Search';
import Title from './Title';
import HeaderSearch from './HeaderSearch';
import './index.css';

export default function Header({ title }) {
  const { pathname: pn } = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  if (pn === '/comidas' || pn === '/explorar/comidas/area' || pn === '/bebidas') {
    return (
      <div>
        <header className="header-container">
          <Profile />
          <Title title={ title || pn } />
          <Search
            onClick={ () => (showSearch ? setShowSearch(false) : setShowSearch(true)) }
          />
        </header>
        {showSearch && <div><HeaderSearch /></div>}
      </div>
    );
  }
  return (
    <header className="header-container2">
      <span className="profile-header">
        <Profile />
      </span>
      <span className="title-header">
        <Title title={ title || pn } />
      </span>
    </header>
  );
}

Header.propTypes = {
  title: string,
};

Header.defaultProps = {
  title: '',
};

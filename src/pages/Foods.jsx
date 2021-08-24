import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function Foods() {
  return (
    <div>
      <Header
        brand="Comidas"
        src={ searchIcon }
        alt="search-icon"
        dataId="search-top-btn"
        className="img-search"
      />
    </div>
  );
}

export default Foods;

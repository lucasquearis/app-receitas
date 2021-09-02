import React from 'react';
import Header from '../../components/Header';
import searchIcon from '../../images/searchIcon.svg';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';

function ExploreOrigin() {
  return (
    <div>
      <Header
        brand="Explorar Origem"
        src={ searchIcon }
        alt="search-icon"
        dataId="search-top-btn"
        className="img-search"
      />
      <Footer />
    </div>
  );
}

export default ExploreOrigin;

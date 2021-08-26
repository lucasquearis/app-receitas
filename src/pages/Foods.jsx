import React from 'react';
import Header from '../components/Header';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import Footer from '../components/Footer';
import '../styles/Footer.css';
import RecipesCard from '../components/RecipesCard';

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
      <RecipesCard />
      <Footer />
    </div>
  );
}

export default Foods;

// vitals
import React from 'react';
// components
import Header from '../components/Header';
import Footer from '../components/FooterMenu';
// styles
import '../styles/FavoriteRecipes.css'

function FavoriteRecipes() {
  const localStorageData = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <main>
      <Header />
      <div className="filter-buttons">
        <button type="button">
          All
        </button>
        <button type="button">
          Food
        </button>
        <button type="button">
          Drinks
        </button>
      </div>
      <div className="favorites-container">
        <div>
          a
        </div>
      </div>
      <Footer />
    </main>
  );
}
export default FavoriteRecipes;

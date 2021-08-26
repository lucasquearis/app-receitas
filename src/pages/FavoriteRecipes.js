// vitals
import React, { useEffect, useState } from 'react';
// components
import Header from '../components/Header';
import Footer from '../components/FooterMenu';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';
// styles
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favoritesArray, setFavoritesArray] = useState();

  const localStorageData = localStorage.getItem('favoriteRecipes');

  // retirar esta linha, só serve pra simular algo que já está no localstorage
  // localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));

  useEffect(() => {
    if (localStorageData) {
      setFavoritesArray(JSON.parse(localStorageData));
    }
  }, [localStorageData]);

  return (
    <main>
      <Header />
      <div className="filter-buttons">
        <button data-testid="filter-by-all-btn" type="button">
          All
        </button>
        <button data-testid="filter-by-food-btn" type="button">
          Food
        </button>
        <button data-testid="filter-by-drink-btn" type="button">
          Drinks
        </button>
      </div>
      <div className="favorites-container">
        {favoritesArray ? favoritesArray
          .map(({ id, alcoholicOrNot, area, category, image, name, type }, index) => (
            <FavoriteRecipeCard
              key={ id }
              id={ id }
              index={ index }
              alcoholicOrNot={ alcoholicOrNot }
              area={ area }
              category={ category }
              image={ image }
              name={ name }
              type={ type }
              favoritesArray={ favoritesArray }
              setFavoritesArray={ setFavoritesArray }
            />

          )) : <h4>Sem favoritos salvos.</h4>}
      </div>
      <Footer />
    </main>
  );
}
export default FavoriteRecipes;

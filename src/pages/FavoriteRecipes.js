import React/* , { useState } */ from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';

function FavoriteRecipes() {
  const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  console.log(favoritesLocalStorage);
  // const [favorites, setFavorites] = useState(favoritesLocalStorage);

  return (
    <>
      <Header title="Receitas Favoritas" search={ false } />

      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      <div>
        { favoritesLocalStorage.map((favorite, index) => (
          <div key={ favorite.id }>
            {/* <Link to={ }> */}
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ favorite.image }
              alt={ favorite.name }
              style={ { width: '100vw' } }
            />
            <h4 data-testid={ `${index}-horizontal-top-text` }>{ favorite.category }</h4>

            {/* </Link> */}
          </div>

        ))}

      </div>
    </>
  );
}

export default FavoriteRecipes;

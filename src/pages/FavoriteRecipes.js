import React/* , { useState } */ from 'react';
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
          <div key={ favoritesLocalStorage.id }>
            {/* <Link to={path...}> */}
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ favorite.image }
              alt={ favorite.name }
            />
            {/* </Link> */}
          </div>

        ))}

      </div>
    </>
  );
}

export default FavoriteRecipes;
